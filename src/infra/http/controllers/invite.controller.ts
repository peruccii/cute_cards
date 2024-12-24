import { PrepareInviteCheckout } from '@application/usecases/prepare-invite-checkout';
import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PrepareInviteCheckoutBody } from '../dtos/prepare-invite-checkout-body';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FirebaseRepository } from '@application/repositories/firebase-repository';

@Controller()
export class InviteController {
  constructor(
    private readonly prepareInviteCheckout: PrepareInviteCheckout,
    private readonly firebaseRepository: FirebaseRepository,
  ) {}

  @Post('checkout')
  @UseInterceptors(FilesInterceptor('images'))
  async createCheckout(
    @Body() body: PrepareInviteCheckoutBody,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const imageUrls = await this.firebaseRepository.uploadImages(
      files,
      body.email,
    );

    const updatedBody = {
      ...body,
      imageUrls: imageUrls,
    };
    const checkout_url = await this.prepareInviteCheckout.execute(updatedBody);
    return checkout_url;
  }
}

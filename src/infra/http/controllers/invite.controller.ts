import { PrepareInviteCheckout } from '@application/usecases/prepare-invite-checkout';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PrepareInviteCheckoutBody } from '../dtos/prepare-invite-checkout-body';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FirebaseRepository } from '@application/repositories/firebase-repository';
import { GetInvite } from '@application/usecases/get-invite';
import { InviteViewModel } from '../view-models/invite-view-model';

@Controller()
export class InviteController {
  constructor(
    private readonly prepareInviteCheckout: PrepareInviteCheckout,
    private readonly get_invite: GetInvite,
    private readonly firebaseRepository: FirebaseRepository,
  ) {}

  @Post('checkout')
  @UseInterceptors(FilesInterceptor('image_urls'))
  async createCheckout(
    @Body() body: PrepareInviteCheckoutBody,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const e = body.email.slice(0, 3);
    const slug = `slug-${e}-${body.invite_type}-${body.invite_plan}-${body.names}`;
    const image_urls = await this.firebaseRepository.uploadImages(files, slug);

    const updatedBody = {
      ...body,
      image_urls: image_urls,
    };
    const checkout_url = await this.prepareInviteCheckout.execute(updatedBody);
    return checkout_url;
  }

  @Get('get/invite/:id')
  async getInvites(@Param('id') id: string) {
    const { invite } = await this.get_invite.execute({ id });

    return InviteViewModel.toGetFormatHttp(invite);
  }
}

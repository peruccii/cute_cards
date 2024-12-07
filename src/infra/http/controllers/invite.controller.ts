import { PrepareInviteCheckout } from '@application/usecases/prepare-invite-checkout';
import { Body, Controller, Post } from '@nestjs/common';
import { PrepareInviteCheckoutBody } from '../dtos/prepare-invite-checkout-body';

@Controller('invites')
export class InviteController {
    constructor(private readonly prepareInviteCheckout: PrepareInviteCheckout) { }

    @Post()
    async createCheckout(@Body() body: PrepareInviteCheckoutBody){
        const checkout_url = await this.prepareInviteCheckout.execute(body);
        return checkout_url;
    }
}

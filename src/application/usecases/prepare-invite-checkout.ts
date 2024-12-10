import { InvitePlan } from "@application/entities/enums/invitePlan";
import { InviteType } from "@application/entities/enums/inviteType";
import { makeInvite } from "@application/factories/invite-factory";
import { CheckoutRepository } from "@application/repositories/checkout-repository";
import { Injectable } from "@nestjs/common";

export interface PrepareInviteCheckoutRequest {
    title: string,
    sub_title: string,
    message: string,
    email: string
    date: Date
    url_music: string | null
    imageUrls: string[]
    invite_type: InviteType
    invite_plan: InvitePlan
}

export interface PrepareInviteCheckoutResponse {
    url_checkout: string
}

@Injectable()
export class PrepareInviteCheckout {
    constructor(
        private checkoutRepository: CheckoutRepository
    ) { }

    async execute(request: PrepareInviteCheckoutRequest): Promise<PrepareInviteCheckoutResponse | null> {

        const { imageUrls } = request;

        const invite = makeInvite({ ...request, imageUrls: imageUrls });

        invite.verifyQuantityOfPhothosByInvitePlan(invite.invite_plan, invite.imageUrls);

        const url_checkout = await this.checkoutRepository.createCheckoutSession(invite)

        if (!url_checkout) return null

        // create invite based on event emmiter on webhook controller, if checkout.session.completed

        return { url_checkout }
    }
}

import { InvitePlan } from "@application/entities/enums/invitePlan";
import { InviteType } from "@application/entities/enums/inviteType";
import { makeInvite } from "@application/factories/invite-factory";
import { CheckoutRepository } from "@application/repositories/checkout-repository";
import { FirebaseRepository } from "@application/repositories/firebase-repository";
import { Injectable } from "@nestjs/common";

export interface PrepareInviteCheckoutRequest {
    title: string,
    sub_title: string,
    message: string,
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
        private firebaseRepository: FirebaseRepository,
        private checkoutRepository: CheckoutRepository
    ) { }

    async execute(request: PrepareInviteCheckoutRequest): Promise<PrepareInviteCheckoutResponse> {

        const invite = makeInvite(request);

        invite.verifyQuantityOfPhothosByInvitePlan(invite.invite_plan, invite.imageUrls);

        const imagesUrl = await this.firebaseRepository.uploadImages(invite.imageUrls, 'name folder firebase [ identificador: email user ]');

        invite.imageUrls = imagesUrl;

        const url_checkout = await this.checkoutRepository.createCheckoutSession(invite)

        return { url_checkout }
    }
}

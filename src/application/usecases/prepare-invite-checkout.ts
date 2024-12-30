import { InvitePlan } from '@application/entities/enums/invitePlan';
import { InviteType } from '@application/entities/enums/inviteType';
import { Invite } from '@application/entities/invite';
import { makeInvite } from '@application/factories/invite-factory';
import { CheckoutRepository } from '@application/repositories/checkout-repository';
import { InviteRepository } from '@application/repositories/invite-repository';
import { PrismaInviteMapper } from '@infra/database/prisma/mappers/prisma-invite-mappers';
import { OnEvent } from '@nestjs/event-emitter';
import { MercadoPagoRepository } from '@application/repositories/mercado-pago-repository';
import { PaymentMethod } from '@application/entities/enums/paymentMethod';
import { Injectable } from '@nestjs/common';

export interface PrepareInviteCheckoutRequest {
  title: string;
  sub_title: string;
  message: string;
  email: string;
  date: Date;
  expirationDate: Date;
  url_music: string | null;
  payment_method: PaymentMethod;
  imageUrls: string[];
  names: string;
  invite_type: InviteType;
  card_color: string;
  invite_plan: InvitePlan;
}

export interface PrepareInviteCheckoutResponse {
  url_checkout: string;
}

@Injectable()
export class PrepareInviteCheckout {
  constructor(
    private checkoutRepository: CheckoutRepository,
    private readonly inviteRepository: InviteRepository,
    private readonly mercadopagoRepository: MercadoPagoRepository,
  ) {}

  async execute(
    request: PrepareInviteCheckoutRequest,
  ): Promise<PrepareInviteCheckoutResponse | null> {
    const { imageUrls } = request;

    const invite = makeInvite({ ...request, imageUrls: imageUrls });

    invite.verifyQuantityOfPhothosByInvitePlan(invite.invite_plan, imageUrls);

    invite.varifyIfUserCanPutUrlMusic(invite.invite_plan);

    const prismaInvite = PrismaInviteMapper.toPrisma(invite);

    if (invite.payment_method === PaymentMethod.PIX) {
      return this.mercadopagoRepository.create(
        prismaInvite.invite_plan,
        prismaInvite.email,
      );
    }

    const url_checkout =
      await this.checkoutRepository.createCheckoutSession(prismaInvite);

    if (!url_checkout) return null;

    return { url_checkout };
  }

  @OnEvent('invite.created', { async: true })
  async createInvite(data: Invite) {
    await this.inviteRepository.create(data);
  }
}

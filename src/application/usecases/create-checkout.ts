import Stripe from 'stripe';
import { CheckoutRepository } from '@application/repositories/checkout-repository';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import CheckoutRequest from '@application/interfaces/checkoutRequest';
import { InvitePlanDetails } from '@application/entities/invite-plan-details';

export interface Metadata extends CheckoutRequest {
  id: string;
}

@Injectable()
export class CreateInviteCheckoutSession implements CheckoutRepository {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get('STRIPE_API_KEY')!, {
      apiVersion: '2024-11-20.acacia',
    });
  }

  async createCheckoutSession(invite: CheckoutRequest): Promise<string | null> {
    const customer = await this.stripe.customers.create({
      metadata: {
        id: invite.id,
        url_music: invite.url_music || null,
        invite_type: invite.invite_type,
        inviteId: invite.id,
        invite_plan: invite.invite_plan,
        date: invite.date.toISOString(),
        title: invite.title,
        sub_title: invite.sub_title,
        message: invite.message,
      },
    });

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer: customer.id,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Cartão ${invite.invite_type} ${invite.invite_plan}`,
              images: ['https://example.com/image.png'],
            },
            unit_amount: InvitePlanDetails.getPrice(invite.invite_plan),
          },
          quantity: 1,
        },
      ],
      metadata: {
        id: invite.id,
        url_music: invite.url_music || null,
        invite_type: invite.invite_type,
        inviteId: invite.id,
        invite_plan: invite.invite_plan,
        date: invite.date.toISOString(),
        title: invite.title,
        sub_title: invite.sub_title,
        message: invite.message,
      },
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
    });

    return session.url;
  }
}

import Stripe from 'stripe';
import { CheckoutRepository } from '@application/repositories/checkout-repository';
import { Invite } from '@application/entities/invite';
import { Injectable } from '@nestjs/common';
import { InvitePlan } from '@application/entities/enums/invitePlan';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CreateInviteCheckoutSession implements CheckoutRepository {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get('STRIPE_API_KEY')!, {
      apiVersion: '2024-11-20.acacia',
    });
  }

  async createCheckoutSession(invite: Invite): Promise<string | null> {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${invite.invite_type} ${invite.invite_plan}`,
              images: ['https://example.com/image.png'],
              metadata: {
                url_music: invite.url_music?.value || null,
                invite_type: invite.invite_type,
                inviteId: invite.id,
                invite_plan: invite.invite_plan,
                date: invite.date.getDate(),
              },
            },
            unit_amount: invite.invite_plan === InvitePlan.BASIC ? 2000 : 3000,
          },
          quantity: 1,
        },
      ],
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
    });

    return session.url;
  }
}

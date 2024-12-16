import { Email } from '@application/entities/fieldsValidations/email';
import {
  CreateSendEmailRequest,
  MailRepository,
} from '@application/repositories/mail-repository';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class HandleEventsStripe {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private mailRepository: MailRepository,
  ) {
    this.stripe = new Stripe(this.configService.get('STRIPE_API_KEY')!, {
      apiVersion: '2024-11-20.acacia',
    });
    this.mailRepository = mailRepository;
  }

  verifyEvent(request: any): Stripe.Event {
    const signature = request.headers['stripe-signature'];
    const endpointSecret = this.configService.get('WHSEC_STRIPE')!;

    return this.stripe.webhooks.constructEvent(
      request.rawBody,
      signature,
      endpointSecret,
    );
  }

  async handleSessionCompleted(event: Stripe.Event) {
    const session = event.data.object as Stripe.Checkout.Session;

    const request: CreateSendEmailRequest = {
      email: new Email(session.customer_email!),
      inviteType: session.metadata!.inviteType,
      clientName: session.customer_details?.name!,
      inviteId: session.metadata!.inviteId,
    };

    return await this.mailRepository.sendEmail(request);
  }
}

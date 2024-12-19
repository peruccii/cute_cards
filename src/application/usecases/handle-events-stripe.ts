import { InvitePlan } from '@application/entities/enums/invitePlan';
import { InviteType } from '@application/entities/enums/inviteType';
import { Email } from '@application/entities/fieldsValidations/email';
import { InviteProps } from '@application/entities/invite';
import { InvitePlanDetails } from '@application/entities/invite-plan-details';
import {
  CreateSendEmailRequest,
  MailRepository,
} from '@application/repositories/mail-repository';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import Stripe from 'stripe';
import { Metadata } from './create-checkout';

@Injectable()
export class HandleEventsStripe {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private mailRepository: MailRepository,
    private eventEmmiter: EventEmitter2,
  ) {
    this.stripe = new Stripe(this.configService.get('STRIPE_API_KEY')!, {
      apiVersion: '2024-11-20.acacia',
    });
    this.mailRepository = mailRepository;
    this.eventEmmiter = eventEmmiter;
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

    const metadata = session.metadata as unknown as Metadata;

    const request: CreateSendEmailRequest = {
      email: new Email(session.customer_email!),
      inviteType: metadata.invite_type,
      clientName: session.customer_details!.name!,
      inviteId: metadata.id,
    };

    const invite: InviteProps = {
      email: new Email(session.customer_email!),
      date: metadata.date,
      duration_invite: InvitePlanDetails.getDate(
        metadata.invite_plan as InvitePlan,
      ),
      title: metadata.title,
      imageUrls: [],
      invite_plan: metadata.invite_plan as InvitePlan,
      message: metadata.message,
      sub_title: metadata.sub_title,
      url_music: metadata.url_music ? metadata.url_music : null,
      invite_type: metadata.invite_type as InviteType,
    };

    this.eventEmmiter.emit('invite.created', invite); // a

    return await this.mailRepository.sendEmail(request);
  }

  async handleSessionExpired() {
    // delete folder firebase
  }
}

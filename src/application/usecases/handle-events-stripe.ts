import { Email } from '@application/entities/fieldsValidations/email';
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
import PrismaCreateInviteRequest from '@application/interfaces/prismaCreateInviteRequest';
import { Message } from '@application/entities/fieldsValidations/message';
import { SubTitle } from '@application/entities/fieldsValidations/subTitle';
import { UrlMusic } from '@application/entities/fieldsValidations/url_music';
import { Title } from '@application/entities/fieldsValidations/title';
import { FirebaseRepository } from '@application/repositories/firebase-repository';

@Injectable()
export class HandleEventsStripe {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private mailRepository: MailRepository,
    private eventEmmiter: EventEmitter2,
    private firebaseMethods: FirebaseRepository,
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

    if (!request.rawBody) {
      throw new Error('Webhook payload is missing or empty');
    }

    return this.stripe.webhooks.constructEvent(
      request.rawBody,
      signature,
      endpointSecret,
    );
  }

  async handleSessionCompleted(event: Stripe.Event) {
    const session = event.data.object as Stripe.Checkout.Session;

    const metadata = session.metadata as unknown as Metadata;

    const email = new Email(session.customer_details!.email!);

    const durationInviteDate = InvitePlanDetails.getDate(metadata.invite_plan);

    const url_music = metadata.url_music
      ? new UrlMusic(metadata.url_music)
      : null;

    const request: CreateSendEmailRequest = {
      email: email.value,
      inviteType: metadata.invite_type,
      clientName: session.customer_details!.name!,
      inviteId: metadata.id,
    };

    const invite: PrismaCreateInviteRequest = {
      id: metadata.id,
      email: email,
      date: metadata.date,
      duration_invite: durationInviteDate,
      title: new Title(metadata.title),
      invite_plan: metadata.invite_plan,
      message: new Message(metadata.message),
      sub_title: new SubTitle(metadata.sub_title),
      url_music: url_music,
      invite_type: metadata.invite_type,
    };

    this.eventEmmiter.emit('invite.created', invite);

    return await this.mailRepository.sendEmail(request);
  }

  async handleSessionExpired(event: Stripe.Event) {
    const session = event.data.object as Stripe.Checkout.Session;
    this.firebaseMethods.delete(session.customer_details!.email!);
  }
}

import { InvitePlan } from '@application/entities/enums/invitePlan';
import { PaymentMethod } from '@application/entities/enums/paymentMethod';
import { PaymentStatus } from '@application/entities/enums/paymentStatus';
import { Email } from '@application/entities/fieldsValidations/email';
import { Message } from '@application/entities/fieldsValidations/message';
import { SubTitle } from '@application/entities/fieldsValidations/subTitle';
import { Title } from '@application/entities/fieldsValidations/title';
import { UrlMusic } from '@application/entities/fieldsValidations/url_music';
import { Invite } from '@application/entities/invite';
import { Payment as PaymentSession } from '@application/entities/payment';
import { InvitePlanDetails } from '@application/entities/invite-plan-details';
import PrismaCreateInviteRequest from '@application/interfaces/prismaCreateInviteRequest';
import { FirebaseRepository } from '@application/repositories/firebase-repository';
import {
  CreateSendEmailRequest,
  MailRepository,
} from '@application/repositories/mail-repository';
import { MercadoPagoRepository } from '@application/repositories/mercado-pago-repository';
import { PrismaInviteMapper } from '@infra/database/prisma/mappers/prisma-invite-mappers';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { randomUUID } from 'node:crypto';
import { PrismaPaymentMapper } from '@infra/database/prisma/mappers/prisma-payment-mapper';
import { PaymentRepository } from '@application/repositories/payment-repository';
import { InviteRepository } from '@application/repositories/invite-repository';

@Injectable()
export class MercadoPago implements MercadoPagoRepository {
  constructor(
    private configService: ConfigService,
    private firebaseRepository: FirebaseRepository,
    private readonly mailRepository: MailRepository,
    private eventEmmiter: EventEmitter2,
    private readonly inviteRepository: InviteRepository,
    private readonly paymentRepository: PaymentRepository,
  ) {}

  async create(
    plan: InvitePlan,
    email: string,
    invite: Invite,
  ): Promise<string> {
    const token = this.configService.get<string>('ACCESS_TOKEN')!;
    const client = new MercadoPagoConfig({
      accessToken: token,
      options: { timeout: 5000, idempotencyKey: `payment-${invite.id}` },
    });

    const payment = new Payment(client);
    const prismaInvite = PrismaInviteMapper.toPrisma(invite);

    const payment_body = {
      id: prismaInvite.id,
      email_user: prismaInvite.email,
      it: prismaInvite.invite_type,
      ip: prismaInvite.invite_plan,
      ns: prismaInvite.names,
      status_payment: PaymentStatus.pending,
      createdAt: prismaInvite.createdAt,
    };

    const prismaPayment = PrismaPaymentMapper.toPrisma(
      payment_body as PaymentSession,
    );

    await this.paymentRepository.create(prismaPayment as PaymentSession);

    const notificationUrl = this.configService.get('WEBHOOK_URL_DEVELOPMENT');

    const body = {
      transaction_amount: InvitePlanDetails.getPricePix(plan),
      description: `Pagamento via PIX do plano ${plan}`,
      payment_method_id: 'pix',
      payer: {
        email: email,
      },
      notification_url: notificationUrl,
      metadata: {
        id: prismaInvite.id,
        url_music: prismaInvite.url_music || null,
        invite_type: prismaInvite.invite_type,
        invite_id: prismaInvite.id,
        email: prismaInvite.email,
        card_color: prismaInvite.card_color,
        bg_color: prismaInvite.bg_color,
        image_urls: prismaInvite.image_urls,
        invite_plan: prismaInvite.invite_plan,
        payment_method: PaymentMethod.PIX,
        payment_status: PaymentStatus.pending,
        date: (prismaInvite.date && prismaInvite.date.toISOString()) || null,
        title: prismaInvite.title,
        names: prismaInvite.names,
        sub_title: prismaInvite.sub_title,
        message: prismaInvite.message,
      },
    };

    const requestOptions = { idempotencyKey: randomUUID() };

    const response = await payment.create({ body, requestOptions });
    if (response.point_of_interaction?.transaction_data?.ticket_url)
      return response.point_of_interaction?.transaction_data?.ticket_url;
    else return 'NA ticket_url';
  }

  async createWebHook(body: any, res: any) {
    const { action, data } = body;

    if (!action || !data?.id) {
      return res.status(400);
    }

    if (action === 'payment.created' || action === 'payment.updated') {
      try {
        const client = new MercadoPagoConfig({
          accessToken: this.configService.get<string>('ACCESS_TOKEN')!,
        });

        const payment = new Payment(client);

        const paymentDetails = await payment.get({ id: data.id });

        const paymentStatus = paymentDetails.status_detail;

        const metadata = paymentDetails.metadata;

        const existingPayment = await this.paymentRepository.findById(
          metadata.id,
        );

        const shouldSavePayment = (
          statusDetail: string | undefined,
        ): boolean => {
          const rejectedStatus = [
            'bank_error',
            'cc_rejected_bad_filled_card_number',
            'cc_rejected_bad_filled_date',
            'cc_rejected_bad_filled_other',
            'cc_rejected_bad_filled_security_code',
            'cc_rejected_blacklist',
            'cc_rejected_card_disabled',
            'cc_rejected_card_error',
            'cc_rejected_high_risk',
            'cc_rejected_insufficient_amount',
            'cc_rejected_invalid_installments',
            'cc_rejected_max_attempts',
            'cc_rejected_other_reason',
            'cc_amount_rate_limit_exceeded',
            'rejected_insufficient_data',
            'rejected_by_bank',
            'rejected_by_regulations',
            'insufficient_amount',
            'cc_rejected_card_type_not_allowed',
          ];

          return !rejectedStatus.includes(statusDetail!);
        };

        if (shouldSavePayment(paymentStatus)) {
          //

          const email = new Email(metadata.email);

          const expirationDate = InvitePlanDetails.getDate(
            metadata.invite_plan,
          );

          const url_music = metadata.url_music
            ? new UrlMusic(metadata.url_music)
            : null;

          const dateNow = new Date();

          const invite: PrismaCreateInviteRequest = {
            id: metadata.id,
            email: email,
            date: metadata.date,
            expirationDate: expirationDate,
            title: new Title(metadata.title),
            invite_plan: metadata.invite_plan,
            card_color: metadata.card_color,
            bg_color: metadata.bg_color,
            payment_method: PaymentMethod.PIX,
            names: metadata.names,
            message: new Message(metadata.message),
            sub_title: new SubTitle(metadata.sub_title),
            url_music: url_music,
            image_urls: metadata.image_urls,
            createdAt: dateNow,
            invite_type: metadata.invite_type,
          };

          const sendEmailRequest: CreateSendEmailRequest = {
            email: email.value,
            inviteType: metadata.invite_type,
            inviteId: metadata.invite_id,
          };

          if (paymentStatus === 'accredited') {
            if (
              existingPayment &&
              existingPayment.status_payment === PaymentStatus.accredited
            ) {
              console.log(
                'Payment already accredited. Skipping further actions.',
              );
              return;
            }

            await this.inviteRepository.create(invite as Invite);
            await this.paymentRepository.updateStatus(invite.id);
            this.mailRepository.sendEmail(sendEmailRequest);
          }
        } else {
          const email = new Email(metadata.email);
          const e = email.value.slice(0, 3);
          const slug = `slug-${e}-${metadata.invite_type}-${metadata.invite_plan}-${metadata.names}`;
          this.firebaseRepository.delete(slug);
        }

        res.status(200);
      } catch (error) {
        console.error('Erro ao processar webhook:', error);
        res
          .status(500)
          .json({ statusCode: 500, data: 'Error processing the webhook' });
      }
    } else {
      res.status(400).send('Unsupported event');
    }
  }
}

import {
  CreateEmailResponse,
  CreateSendEmailRequest,
  MailRepository,
} from '@application/repositories/mail-repository';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { ResendSendMailError } from '../errors/resend-send-email-error';
import { checkInviteTypeAndReturnHtml } from './return_html_invitetype';

@Injectable()
export class Resendmail implements MailRepository {
  private resend: Resend;

  constructor(private configService: ConfigService) {
    this.resend = new Resend(this.configService.get('RESEND_KEY'));
  }

  async sendEmail(
    request: CreateSendEmailRequest,
  ): Promise<CreateEmailResponse> {
    const response = await this.resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [request.email.value],
      subject: 'hello world',
      html: checkInviteTypeAndReturnHtml(request),
    });

    if (!response.data?.id) throw new ResendSendMailError();

    return { id: response.data.id };
  }
}

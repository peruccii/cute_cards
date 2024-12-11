import { Email } from "@application/entities/fieldsValidations/email";
import { MailRepository } from "@application/repositories/mail-repository";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Resend } from "resend";
import { ResendSendMailError } from "../errors/resend-send-email-error";

@Injectable()
export class Resendmail implements MailRepository {

    private resend: Resend

    constructor(private configService: ConfigService) {
        this.resend = new Resend(this.configService.get('RESEND_KEY'));
    }

    async sendEmail(email: Email) {
        const response = await this.resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: [email.value],
            subject: 'hello world',
            html: '<p>it works!</p>',
        });
        if (!response.data?.id) throw new ResendSendMailError();
        return response
    }
}

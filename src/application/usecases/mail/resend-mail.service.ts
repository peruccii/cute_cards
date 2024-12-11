import { Email } from "@application/entities/fieldsValidations/email";
import { MailRepository } from "@application/repositories/mail-repository";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Resend } from "resend";

@Injectable()
export class Resendmail implements MailRepository {

    private resend

    constructor(private configService: ConfigService) {
        this.resend = new Resend(this.configService.get('RESEND_KEY'));
    }

    async sendEmail(email: Email) {
        await this.resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: [email],
            subject: 'hello world',
            html: '<p>it works!</p>',
        });
    }
}

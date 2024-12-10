import { Email } from "@application/entities/fieldsValidations/email";
import { MailRepository } from "@application/repositories/mail-repository";
import { Injectable } from "@nestjs/common";
import { Resend } from "resend";

@Injectable()
export class Resendmail implements MailRepository {

    private resend

    constructor() {
        this.resend = new Resend('re_dn4t44i3_47vgKJq23bJ8BZB7qtHajEDP');
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

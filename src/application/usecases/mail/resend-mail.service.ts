import { CreateEmailResponse, CreateSendEmailRequest, MailRepository } from "@application/repositories/mail-repository";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Resend } from "resend";
import { ResendSendMailError } from "../errors/resend-send-email-error";
import { InviteTypeConstants } from "../constants/invite_type_constants";
import { InviteType } from "@application/entities/enums/inviteType";

@Injectable()
export class Resendmail implements MailRepository {

    private resend: Resend

    constructor(private configService: ConfigService) {
        this.resend = new Resend(this.configService.get('RESEND_KEY'));
    }

    async sendEmail(request: CreateSendEmailRequest): Promise<CreateEmailResponse> {

        const response = await this.resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: [request.email.value],
            subject: 'hello world',
            html: checkInviteTypeAndReturnHtml(request),
        });

        if (!response.data?.id) throw new ResendSendMailError();

        return { id: response.data.id }
    }
}

function checkInviteTypeAndReturnHtml({ inviteType, clientName, inviteId }: CreateSendEmailRequest): string {

    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://localhost:3000/card/${inviteId}`

    switch (inviteType) {
        case InviteType.LOVE: {
            const invite_type_constants = new InviteTypeConstants()
            invite_type_constants.getLoveContent(qrCodeUrl, clientName)
            return '<p>Thanks for the payment</p>'
        }
        case InviteType.BIRTHDAY: {
            return '<p>Thanks for the payment</p>'
        }
        case InviteType.BESTFRIENDS: {
            return '<p>Thanks for the payment</p>'
        }
        default: {
            return '<p>Thanks for the payment</p>'
        }
    }
}

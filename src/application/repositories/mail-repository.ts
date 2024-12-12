import { Email } from "@application/entities/fieldsValidations/email";

export interface CreateEmailResponse { }

export interface CreateSendEmailRequest {
    email: Email
    inviteType: string,
    inviteId: string
    clientName: string
}

export abstract class MailRepository {
    abstract sendEmail(request: CreateSendEmailRequest): Promise<CreateEmailResponse>;
}

import { Email } from "@application/entities/fieldsValidations/email";

export interface CreateEmailResponse {}

export abstract class MailRepository {
    abstract sendEmail(email: Email): Promise<CreateEmailResponse>;
}

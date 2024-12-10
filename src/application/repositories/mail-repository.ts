import { Email } from "@application/entities/fieldsValidations/email";

export abstract class MailRepository {
    abstract sendEmail(email: Email): Promise<void>;
}

export interface CreateEmailResponse {
  id: string;
}

export interface CreateSendEmailRequest {
  email: string;
  inviteType: string;
  inviteId: string;
  clientName: string;
}

export abstract class MailRepository {
  abstract sendEmail(
    request: CreateSendEmailRequest,
  ): Promise<CreateEmailResponse>;
}

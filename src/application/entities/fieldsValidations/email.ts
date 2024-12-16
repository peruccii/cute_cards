import { EmailInvalidError } from '@application/usecases/errors/email-invalid-error';

export class Email {
  private readonly email: string;

  get value(): string {
    return this.email;
  }

  private validateEmailLength(email: string): boolean {
    return email.length >= 5 && email.length <= 55;
  }

  private validateEmailIsValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  constructor(email: string) {
    const isEmailLengthValid = this.validateEmailLength(email);
    const isEmailValid = this.validateEmailIsValid(email);

    if (!isEmailLengthValid) throw new EmailInvalidError();
    if (!isEmailValid) throw new EmailInvalidError();

    this.email = email;
  }
}

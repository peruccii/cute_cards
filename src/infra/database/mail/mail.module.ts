import { Module } from '@nestjs/common';
import { Resendmail } from '@application/usecases/mail/resend-mail.service';
import { MailRepository } from '@application/repositories/mail-repository';

@Module({
  providers: [
    Resendmail,
    {
      provide: MailRepository,
      useClass: Resendmail,
    },
  ],
  exports: [MailRepository],
})
export class MailModule {}

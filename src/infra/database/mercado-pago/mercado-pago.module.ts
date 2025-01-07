import { Module } from '@nestjs/common';
import { MercadoPago } from '@application/usecases/mercado-pago';
import { MercadoPagoRepository } from '@application/repositories/mercado-pago-repository';
import { FirebaseRepository } from '@application/repositories/firebase-repository';
import { Firebase } from '@application/usecases/firebase-methods';
import { MailRepository } from '@application/repositories/mail-repository';
import { Resendmail } from '@application/usecases/mail/resend-mail.service';
import { PaymentModule } from '../payment/payment.module';
import { ConfigModule } from '@nestjs/config';
import { InviteRepository } from '@application/repositories/invite-repository';
import { PrismaInviteRepository } from '../repositories/prisma-invite-repository';

@Module({
  imports: [PaymentModule, ConfigModule],
  providers: [
    MercadoPago,
    {
      provide: MercadoPagoRepository,
      useClass: MercadoPago,
    },
    {
      provide: FirebaseRepository,
      useClass: Firebase,
    },
    {
      provide: MailRepository,
      useClass: Resendmail,
    },
    {
      provide: InviteRepository,
      useClass: PrismaInviteRepository,
    },
  ],
  exports: [MercadoPagoRepository],
})
export class MercadoPagoModule {}

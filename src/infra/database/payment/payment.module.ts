import { Module } from '@nestjs/common';
import { PrismaPaymentRepository } from '../repositories/prisma-payment-repository';
import { PaymentRepository } from '@application/repositories/payment-repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    PrismaPaymentRepository,
    {
      provide: PaymentRepository,
      useClass: PrismaPaymentRepository,
    },
  ],
  exports: [PaymentRepository],
})
export class PaymentModule {}

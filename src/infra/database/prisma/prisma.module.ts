import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { InviteRepository } from '@application/repositories/invite-repository';
import { PrismaInviteRepository } from '../repositories/prisma-invite-repository';
import { PaymentRepository } from '@application/repositories/payment-repository';
import { PrismaPaymentRepository } from '../repositories/prisma-payment-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: InviteRepository,
      useClass: PrismaInviteRepository,
    },
    {
      provide: PaymentRepository,
      useClass: PrismaPaymentRepository,
    },
  ],
  exports: [InviteRepository, PaymentRepository, PrismaService],
})
export class PrismaModule {}

import { PaymentStatus } from '@application/entities/enums/paymentStatus';
import { FirebaseRepository } from '@application/repositories/firebase-repository';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class DeleteImgsFromFirebaseSchedule {
  constructor(
    private prisma: PrismaService,
    private readonly firebaseRepository: FirebaseRepository,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async delete() {
    const currentTime = new Date();

    const expiredPayments = await this.prisma.payment.findMany({
      where: {
        status_payment: PaymentStatus.pending,
        createdAt: {
          lt: new Date(currentTime.getTime() - 24 * 60 * 60 * 1000),
        },
      },
    });

    for (const payment of expiredPayments) {
      const e = payment.email_user.slice(0, 3);
      const slug = `slug-${e}-${payment.it}-${payment.ip}-${payment.ns}`;
      await this.firebaseRepository.delete(slug);
      await this.prisma.payment.delete({ where: { id: payment.id } });
    }
    console.log('IMAGENS APAGADAS');
  }
}

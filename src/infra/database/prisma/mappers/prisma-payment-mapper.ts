import { PaymentStatus } from '@application/entities/enums/paymentStatus';
import { Payment } from '@application/entities/payment';
import { Payment as RawPayment } from '@prisma/client';

export class PrismaPaymentMapper {
  static toPrisma(payment: Payment) {
    return {
      id: payment.id,
      email_user: payment.email_user,
      createdAt: payment.createdAt,
      status_payment: payment.status_payment,
    };
  }

  static toDomain(raw: RawPayment): Payment {
    return new Payment(
      {
        email_user: raw.email_user,
        createdAt: raw.createdAt,
        status_payment: raw.status_payment as PaymentStatus,
      },
      raw.id,
    );
  }
}

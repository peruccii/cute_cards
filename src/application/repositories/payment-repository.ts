import { Payment } from '@application/entities/payment';

export abstract class PaymentRepository {
  abstract create(payment: Payment);
  abstract delete(id: string);
  abstract findMany(): Promise<Payment[]>;
  abstract findById(id_payment: string): Promise<Payment | null>;
  abstract updateStatus(id_payment: string);
}

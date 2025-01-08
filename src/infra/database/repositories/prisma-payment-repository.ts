import { PaymentRepository } from '@application/repositories/payment-repository';
import { PrismaService } from '../prisma/prisma.service';
import { Payment } from '@application/entities/payment';
import { Injectable } from '@nestjs/common';
import { PrismaPaymentMapper } from '../prisma/mappers/prisma-payment-mapper';

@Injectable()
export class PrismaPaymentRepository implements PaymentRepository {
  constructor(private prisma: PrismaService) {}

  async updateStatus(id_payment: string) {
    await this.prisma.payment.update({
      where: { id: id_payment },
      data: {
        status_payment: 'accredited',
      },
    });
  }

  async findById(id_payment: string): Promise<Payment | null> {
    const payment = await this.prisma.payment.findFirst({
      where: { id: id_payment },
    });

    if (!payment) return null;

    return PrismaPaymentMapper.toDomain(payment);
  }

  async create(payment: Payment) {
    const raw = PrismaPaymentMapper.toPrisma(payment);
    await this.prisma.payment.create({
      data: raw,
    });
  }
  async delete(id: string) {
    await this.prisma.payment.delete({ where: { id: id } });
  }
  async findMany(): Promise<Payment[]> {
    const payments = await this.prisma.payment.findMany();

    return payments.map((invite) => {
      return PrismaPaymentMapper.toDomain(invite);
    });
  }
}

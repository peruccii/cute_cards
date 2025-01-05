import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { MailModule } from './mail/mail.module';
import { FirebaseModule } from './firebase/firebase.module';
import { CheckoutModule } from './checkout/checkout.module';
import { MercadoPagoModule } from './mercado-pago/mercado-pago.module';
import { ScheduleTasksModule } from './schedule/schedule-task';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    MailModule,
    FirebaseModule,
    CheckoutModule,
    PaymentModule,
    MercadoPagoModule,
    ScheduleTasksModule,
    // ImageUploadModuleBull,
  ],
  exports: [
    PrismaModule,
    MailModule,
    FirebaseModule,
    CheckoutModule,
    MercadoPagoModule,
    PaymentModule,
    ScheduleTasksModule,
    // ImageUploadModuleBull,
  ],
})
export class DatabaseModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { MailModule } from './mail/mail.module';
import { FirebaseModule } from './firebase/firebase.module';
import { CheckoutModule } from './checkout/checkout.module';

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
  ],
  exports: [PrismaModule, MailModule, FirebaseModule, CheckoutModule],
})
export class DatabaseModule {}

import { Module } from '@nestjs/common';
import { InviteController } from './controllers/invite.controller';
import { PrepareInviteCheckout } from '@application/usecases/prepare-invite-checkout';
import { CreateInviteCheckoutSession } from '@application/usecases/create-checkout';
import { DatabaseModule } from '@infra/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { PixController } from './controllers/pix-webhook.controller';
import { StripeWebhookController } from './controllers/stripe-webhook-controller';
import { MercadoPago } from '@application/usecases/mercado-pago';
import { HandleEventsStripe } from '@application/usecases/handle-events-stripe';
import { GetInvite } from '@application/usecases/get-invite';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'env',
    }),
    // BullModule.registerQueue({
    //   name: 'image-upload-queue',
    //   redis: {
    //     host: 'redis',
    //     port: 6379,
    //   },
    // }),
    // ImageUploadModuleBull,
  ],
  controllers: [InviteController, PixController, StripeWebhookController],
  providers: [
    PrepareInviteCheckout,
    CreateInviteCheckoutSession,
    GetInvite,
    MercadoPago,
    HandleEventsStripe,
  ],
})
export class HttpModule {}

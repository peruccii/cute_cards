import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CreateInviteCheckoutSession } from '@application/usecases/create-checkout';
import { StripeWebhookController } from '@infra/http/controllers/stripe-webhook-controller';
import { HandleEventsStripe } from '@application/usecases/handle-events-stripe';
const STRIPE_API_KEY = 'STRIPE_API_KEY';

@Module({
  controllers: [StripeWebhookController]
})
export class StripeModule {

  static forRootAsync(): DynamicModule {
    return {
      module: StripeModule,
      controllers: [StripeWebhookController],
      imports: [ConfigModule.forRoot()],
      providers: [
        HandleEventsStripe,
        {
          provide: STRIPE_API_KEY,
          useFactory: async (configService: ConfigService) =>
            configService.get(STRIPE_API_KEY),
          inject: [ConfigService],
        },
      ],
    };
  }
}

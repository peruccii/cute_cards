import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CreateInviteCheckoutSession } from '@application/usecases/create-checkout';
import { CheckoutController } from '@infra/http/controllers/checkout-controller';

@Module({
  controllers: [CheckoutController]
})
export class StripeModule {

  static forRootAsync(): DynamicModule {
    return {
      module: StripeModule,
      controllers: [CheckoutController],
      imports: [ConfigModule.forRoot()],
      providers: [
        CreateInviteCheckoutSession,
        {
          provide: process.env.STRIPE_API_KEY!,
          useFactory: async (configService: ConfigService) =>
            configService.get(process.env.STRIPE_API_KEY!),
          inject: [ConfigService],
        },
      ],
    };
  }
}

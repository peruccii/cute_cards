import { Module } from '@nestjs/common';
import { CreateInviteCheckoutSession } from '@application/usecases/create-checkout';
import { CheckoutRepository } from '@application/repositories/checkout-repository';

@Module({
  providers: [
    CreateInviteCheckoutSession,
    {
      provide: CheckoutRepository,
      useClass: CreateInviteCheckoutSession,
    },
  ],
  exports: [CheckoutRepository],
})
export class CheckoutModule {}

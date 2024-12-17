import { HandleEventsStripe } from '@application/usecases/handle-events-stripe';
import { Controller, Post, Req } from '@nestjs/common';

@Controller('webhook')
export class StripeWebhookController {
  constructor(private readonly stripeService: HandleEventsStripe) {}

  @Post('stripe')
  async handleStripeWebhook(@Req() request: any) {
    const event = this.stripeService.verifyEvent(request);
    if (event.type === 'checkout.session.completed') {
      await this.stripeService.handleSessionCompleted(event);
    }

    if (event.type === 'checkout.session.expired') {
      await this.stripeService.handleSessionCancelled();
    }
    return { received: true };
  }
}

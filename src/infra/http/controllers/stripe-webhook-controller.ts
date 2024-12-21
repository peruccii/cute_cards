import { HandleEventsStripe } from '@application/usecases/handle-events-stripe';
import { Controller, Post, RawBodyRequest, Req } from '@nestjs/common';

@Controller('webhook')
export class StripeWebhookController {
  constructor(private readonly stripeService: HandleEventsStripe) {}

  @Post()
  async handleStripeWebhook(@Req() req: RawBodyRequest<Request>) {
    const event = this.stripeService.verifyEvent(req);

    if (event.type === 'checkout.session.completed') {
      await this.stripeService.handleSessionCompleted(event);
    }

    if (event.type === 'checkout.session.expired') {
      await this.stripeService.handleSessionExpired(event);
    }

    if (event.type === 'checkout.session.async_payment_failed') {
      await this.stripeService.handleSessionPayamentFailed(event);
    }

    return { received: true };
  }
}

import { InviteRepository } from '@application/repositories/invite-repository';
import { HandleEventsStripe } from '@application/usecases/handle-events-stripe';
import { Controller, Post, Req } from '@nestjs/common';

@Controller('webhook')
export class StripeWebhookController {
  constructor(
    private readonly stripeService: HandleEventsStripe,
    private inviteRepository: InviteRepository,
  ) {}

  @Post('stripe')
  async handleStripeWebhook(@Req() request: any) {
    const event = this.stripeService.verifyEvent(request);
    if (event.type === 'checkout.session.completed') {
      await this.stripeService.handleSessionCompleted(event);
    }

    if (event.type === 'checkout.session.expired') {
      await this.stripeService.handleSessionExpired();
    }
    return { received: true };
  }
}

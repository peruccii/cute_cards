import CheckoutRequest from '@application/interfaces/checkout';

export abstract class CheckoutRepository {
  abstract createCheckoutSession(
    invite: CheckoutRequest,
  ): Promise<string | null>;
}

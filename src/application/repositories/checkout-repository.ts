import CheckoutRequest from '@application/interfaces/checkoutRequest';

export abstract class CheckoutRepository {
  abstract createCheckoutSession(
    invite: CheckoutRequest,
  ): Promise<string | null>;
}

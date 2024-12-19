import { Invite } from '@application/entities/invite';

export abstract class CheckoutRepository {
  abstract createCheckoutSession(
    invite: Partial<Invite>,
  ): Promise<string | null>;
}

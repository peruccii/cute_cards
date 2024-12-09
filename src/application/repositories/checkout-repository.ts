import { Invite } from "@application/entities/invite";

export abstract class CheckoutRepository {
    abstract createCheckoutSession(invite: Invite): Promise<string | null>
}
import { InvitePlan } from '@application/entities/enums/invitePlan';
import { Invite } from '@application/entities/invite';

export abstract class MercadoPagoRepository {
  abstract create(
    plan: InvitePlan,
    email: string,
    invite: Invite,
  ): Promise<string>;
}

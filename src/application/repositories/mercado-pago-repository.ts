import { InvitePlan } from '@application/entities/enums/invitePlan';

export abstract class MercadoPagoRepository {
  abstract create(plan: InvitePlan, email: string);
}

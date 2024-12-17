import { InvitePlan } from './enums/invitePlan';

export class InvitePlanDetails {
  static getDate(plan: InvitePlan): Date {
    const today = new Date();
    switch (plan) {
      case InvitePlan.BASIC: {
        today.setFullYear(today.getFullYear() + 1);
        return today;
      }

      case InvitePlan.PREMIUM: {
        today.setFullYear(today.getFullYear() + 5);
        return today;
      }
    }
  }
}

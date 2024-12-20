import { InvitePlan } from '@application/entities/enums/invitePlan';
import { InviteType } from '@application/entities/enums/inviteType';

export default interface CheckoutRequest {
  id: string;
  email: string;
  invite_plan: InvitePlan;
  invite_type: InviteType;
  title: string;
  sub_title: string;
  imageUrls: string[];
  message: string;
  url_music: string | null;
  date: Date;
  duration_invite: Date;
}

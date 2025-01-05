import { InvitePlan } from '@application/entities/enums/invitePlan';
import { InviteType } from '@application/entities/enums/inviteType';

export default interface CheckoutRequest {
  id: string;
  email: string;
  invite_plan: InvitePlan;
  invite_type: InviteType;
  title: string;
  sub_title: string;
  image_urls: string[];
  message: string;
  card_color: string;
  bg_color: string;
  names: string;
  url_music: string | null;
  date: Date;
  expirationDate: Date;
}

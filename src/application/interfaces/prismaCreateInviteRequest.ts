import { InvitePlan } from '@application/entities/enums/invitePlan';
import { InviteType } from '@application/entities/enums/inviteType';
import { PaymentMethod } from '@application/entities/enums/paymentMethod';
import { Email } from '@application/entities/fieldsValidations/email';
import { Message } from '@application/entities/fieldsValidations/message';
import { SubTitle } from '@application/entities/fieldsValidations/subTitle';
import { Title } from '@application/entities/fieldsValidations/title';
import { UrlMusic } from '@application/entities/fieldsValidations/url_music';

export default interface PrismaCreateInviteRequest {
  id: string;
  email: Email;
  invite_plan: InvitePlan;
  invite_type: InviteType;
  title: Title;
  sub_title: SubTitle;
  message: Message;
  image_urls: string[];
  payment_method: PaymentMethod;
  card_color: string;
  bg_color: string;
  names: string;
  createdAt: Date;
  url_music: UrlMusic | null;
  date: Date;
  expirationDate: Date;
}

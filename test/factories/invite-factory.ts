import { InvitePlan } from '@application/entities/enums/invitePlan';
import { InviteType } from '@application/entities/enums/inviteType';
import { PaymentMethod } from '@application/entities/enums/paymentMethod';
import { Email } from '@application/entities/fieldsValidations/email';
import { Message } from '@application/entities/fieldsValidations/message';
import { SubTitle } from '@application/entities/fieldsValidations/subTitle';
import { Title } from '@application/entities/fieldsValidations/title';
import { UrlMusic } from '@application/entities/fieldsValidations/url_music';
import { Invite, InviteProps } from '@application/entities/invite';
import { InvitePlanDetails } from '@application/entities/invite-plan-details';

type Override = Partial<InviteProps>;

export function makeInvite(override: Override = {}) {
  return new Invite({
    date: new Date('2024-12-05'),
    sub_title: new SubTitle('This is a sub_title text'),
    email: new Email('email@example.com'),
    title: new Title('This is a title text'),
    card_color: '#7DS8HE',
    bg_color: '#7DS8HE',
    payment_method: PaymentMethod.STRIPE,
    names: 'batman robin',
    invite_plan: InvitePlan.BASIC,
    expirationDate: InvitePlanDetails.getDate(InvitePlan.BASIC),
    url_music: new UrlMusic('https://www.youtube.com/watch?v=hTWKbfoikeg'),
    message: new Message('This is a message text.'),
    image_urls: [''],
    invite_type: InviteType.LOVE,
    ...override,
  });
}

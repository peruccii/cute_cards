import { Email } from '@application/entities/fieldsValidations/email';
import { Message } from '@application/entities/fieldsValidations/message';
import { SubTitle } from '@application/entities/fieldsValidations/subTitle';
import { Title } from '@application/entities/fieldsValidations/title';
import { UrlMusic } from '@application/entities/fieldsValidations/url_music';
import { Invite } from '@application/entities/invite';
import { InvitePlanDetails } from '@application/entities/invite-plan-details';
import { PrepareInviteCheckoutRequest } from '@application/usecases/prepare-invite-checkout';

type Override = PrepareInviteCheckoutRequest;

export function makeInvite(override: Override) {
  return new Invite({
    date: new Date(override.date),
    sub_title: new SubTitle(override.sub_title),
    title: new Title(override.title),
    email: new Email(override.email),
    invite_plan: override.invite_plan,
    invite_type: override.invite_type,
    expirationDate: InvitePlanDetails.getDate(override.invite_plan),
    url_music:
      override.url_music && override.url_music.length > 0
        ? new UrlMusic(override.url_music)
        : null,
    message: new Message(override.message),
    imageUrls: override.imageUrls,
  });
}

import { InvitePlan } from '@application/entities/enums/invitePlan';
import { InviteType } from '@application/entities/enums/inviteType';
import { PaymentMethod } from '@application/entities/enums/paymentMethod';
import { Email } from '@application/entities/fieldsValidations/email';
import { Message } from '@application/entities/fieldsValidations/message';
import { SubTitle } from '@application/entities/fieldsValidations/subTitle';
import { Title } from '@application/entities/fieldsValidations/title';
import { UrlMusic } from '@application/entities/fieldsValidations/url_music';
import { Invite } from '@application/entities/invite';
import { Invite as RawInvite } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';

function convertJsonValueToStringArray(value: JsonValue): string[] {
  if (Array.isArray(value) && value.every((item) => typeof item === 'string')) {
    return value as string[];
  }

  return [];
}

export class PrismaInviteMapper {
  static toPrisma(invite: Invite) {
    return {
      id: invite.id,
      email: invite.email.value,
      invite_plan: invite.invite_plan,
      invite_type: invite.invite_type,
      card_color: invite.card_color,
      bg_color: invite.bg_color,
      names: invite.names,
      title: invite.title.value,
      payment_method: invite.payment_method,
      sub_title: invite.sub_title.value,
      image_urls: invite.image_urls,
      message: invite.message.value,
      url_music:
        invite.url_music &&
        invite.url_music.value &&
        invite.url_music.value.length > 0
          ? invite.url_music.value
          : null,

      date: invite.date ? invite.date : null,
      expirationDate: invite.expirationDate,
      createdAt: invite.createdAt,
    };
  }
  static toDomain(raw: RawInvite): Invite {
    return new Invite(
      {
        email: new Email(raw.email),
        invite_plan: raw.invite_plan as InvitePlan,
        invite_type: raw.invite_type as InviteType,
        title: new Title(raw.title),
        card_color: raw.card_color,
        bg_color: raw.bg_color,
        names: raw.names,
        payment_method: raw.payment_method as PaymentMethod,
        sub_title: new SubTitle(raw.sub_title),
        image_urls: convertJsonValueToStringArray(raw.image_urls),
        message: new Message(raw.message),
        url_music:
          raw.url_music && raw.url_music ? new UrlMusic(raw.url_music) : null,
        date: raw.date ? raw.date : null,
        expirationDate: raw.expirationDate,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}

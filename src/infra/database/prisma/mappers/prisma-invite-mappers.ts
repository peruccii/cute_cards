import { InvitePlan } from '@application/entities/enums/invitePlan';
import { InviteType } from '@application/entities/enums/inviteType';
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
      ...invite,
      id: invite.id,
      email: invite.email.value,
      invite_plan: invite.invite_plan,
      invite_type: invite.invite_type,
      title: invite.title.value,
      sub_title: invite.sub_title.value,
      imageUrls: invite.imageUrls,
      message: invite.message.value,
      url_music:
        invite.url_music &&
        invite.url_music.value &&
        invite.url_music.value.length > 0
          ? invite.url_music.value
          : null,

      date: invite.date,
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
        sub_title: new SubTitle(raw.sub_title),
        imageUrls: convertJsonValueToStringArray(raw.imageUrls),
        message: new Message(raw.message),
        url_music:
          raw.url_music && raw.url_music ? new UrlMusic(raw.url_music) : null,
        date: raw.date,
        expirationDate: raw.expirationDate,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}

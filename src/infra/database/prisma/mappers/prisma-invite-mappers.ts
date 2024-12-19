import { Email } from '@application/entities/fieldsValidations/email';
import { Message } from '@application/entities/fieldsValidations/message';
import { SubTitle } from '@application/entities/fieldsValidations/subTitle';
import { Title } from '@application/entities/fieldsValidations/title';
import { Invite } from '@application/entities/invite';

export class PrismaInviteMapper {
  static toPrisma(invite: Invite): Partial<Invite> {
    return {
      ...invite,
      id: invite.id,
      email: invite.email.value as unknown as Email,
      invite_plan: invite.invite_plan,
      invite_type: invite.invite_type,
      title: invite.title.value as unknown as Title,
      sub_title: invite.sub_title.value as unknown as SubTitle,
      imageUrls: invite.imageUrls,
      message: invite.message.value as unknown as Message,
      url_music: invite.url_music,
      date: invite.date,
      duration_invite: invite.duration_invite,
    };
  }
}

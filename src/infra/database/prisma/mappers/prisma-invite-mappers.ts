import { Invite } from '@application/entities/invite';

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
      duration_invite: invite.duration_invite,
    };
  }
}

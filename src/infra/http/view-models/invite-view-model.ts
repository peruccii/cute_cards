import { Invite } from '@application/entities/invite';

export class InviteViewModel {
  static toGetFormatHttp(invite: Invite) {
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

      date: invite.date,
      expirationDate: invite.expirationDate,
      createdAt: invite.createdAt,
    };
  }
}

import { CreateSendEmailRequest } from '@application/repositories/mail-repository';
import { InviteTypeConstants } from '../constants/invite_type_constants';
import { InviteType } from '@application/entities/enums/inviteType';

export function checkInviteTypeAndReturnHtml({
  inviteType,
  inviteId,
}: CreateSendEmailRequest): string {
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://https://cutecards.com.br/page/${inviteId}`;
  const link = `https://cutecards.com.br/page/${inviteId}`;
  const invite_type_constants = new InviteTypeConstants();

  switch (inviteType) {
    case InviteType.LOVE: {
      return invite_type_constants.getLoveContent(qrCodeUrl, link);
    }

    case InviteType.BIRTHDAY: {
      return invite_type_constants.getBirthdayContent(qrCodeUrl, link);
    }

    case InviteType.BESTFRIENDS: {
      return invite_type_constants.getBestFriendsContent(qrCodeUrl, link);
    }

    default: {
      return '<p>Thanks for the payment</p>';
    }
  }
}

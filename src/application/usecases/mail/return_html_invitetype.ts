import { CreateSendEmailRequest } from '@application/repositories/mail-repository';
import { InviteTypeConstants } from '../constants/invite_type_constants';
import { InviteType } from '@application/entities/enums/inviteType';

export function checkInviteTypeAndReturnHtml({
  inviteType,
  clientName,
  inviteId,
}: CreateSendEmailRequest): string {
  const qrCodeUrl = `https://api.qrserver.com/v-1/create-qr-code/?size=150x150&data=http://localhost:3000/card/${inviteId}`;

  const invite_type_constants = new InviteTypeConstants();

  switch (inviteType) {
    case InviteType.LOVE: {
      return invite_type_constants.getLoveContent(qrCodeUrl, clientName);
    }

    case InviteType.BIRTHDAY: {
      return invite_type_constants.getLoveContent(qrCodeUrl, clientName);
    }

    case InviteType.BESTFRIENDS: {
      return invite_type_constants.getLoveContent(qrCodeUrl, clientName);
    }

    default: {
      return '<p>Thanks for the payment</p>';
    }
  }
}

import { Invite } from '@application/entities/invite';
import { InviteRepository } from '@application/repositories/invite-repository';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class DeleteInviteSchedule {
  constructor(private readonly inviteRepository: InviteRepository) {}

  deleteInvite(invite: Invite) {
    const diffInMilliseconds =
      new Date(invite.expirationDate).getTime() -
      new Date(invite.createdAt).getTime();

    const diffInDays = diffInMilliseconds / (1000 * 3600 * 24);

    const ONEYEAR = diffInDays === 365 || diffInDays === 366;

    const FIVEYEARS = diffInDays === 1825;

    if (ONEYEAR || FIVEYEARS) this.inviteRepository.delete(invite.id);
  }

  @Cron(CronExpression.EVERY_YEAR)
  async delete() {
    //
    const invites = await this.inviteRepository.findMany();

    invites.map((invite) => {
      this.deleteInvite(invite);
    });
  }
}

import { Invite } from '@application/entities/invite';
import { InviteRepository } from '@application/repositories/invite-repository';

export class InMemoryInviteRepository implements InviteRepository {
  public invites: Invite[] = [];

  findMany(): Promise<Invite[]> {
    return Promise.resolve(this.invites);
  }
  delete(id: string) {
    throw new Error(`Method not implemented ${id}.`);
  }

  create(invite: Invite) {
    return this.invites.push(invite);
  }
}

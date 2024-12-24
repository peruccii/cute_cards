import { Invite } from '@application/entities/invite';
import { InviteRepository } from '@application/repositories/invite-repository';

export class InMemoryInviteRepository implements InviteRepository {
  findMany(): Promise<Invite[]> {
    throw new Error('Method not implemented.');
  }
  delete(id: string) {
    throw new Error(`Method not implemented ${id}.`);
  }
  public invites: Invite[] = [];

  create(invite: Invite) {
    return this.invites.push(invite);
  }
}

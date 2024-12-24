import { Invite } from '@application/entities/invite';

export abstract class InviteRepository {
  abstract create(invite: Invite);
  abstract delete(id: string);
  abstract findMany(): Promise<Invite[]>;
}

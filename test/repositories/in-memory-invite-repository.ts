import { Invite } from "@application/entities/invite";
import { InviteRepository } from "@application/repositories/invite-repository";

export class InMemoryInviteRepository implements InviteRepository {
    public invites: Invite[] = []

    create(invite: Invite) {
        this.invites.push(invite);
    }

}

import { Invite } from "@application/entities/invite";

export abstract class InviteRepository {
    abstract create(invite: Invite): Promise<string> // custom promise
}

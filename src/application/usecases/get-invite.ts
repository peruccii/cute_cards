import { Invite } from '@application/entities/invite';
import { InviteRepository } from '@application/repositories/invite-repository';
import { Injectable } from '@nestjs/common';

interface GetInviteRequest {
  id: string;
}

interface GetInviteResponse {
  invite: Invite;
}

@Injectable()
export class GetInvite {
  constructor(private inviteRepository: InviteRepository) {}

  async execute(request: GetInviteRequest): Promise<GetInviteResponse> {
    const { id } = request;
    const invite = await this.inviteRepository.find(id);

    if (!invite) throw new Error('Invite not found');

    return { invite };
  }
}

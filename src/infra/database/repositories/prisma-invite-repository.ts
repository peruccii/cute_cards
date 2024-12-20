import { Invite } from '@application/entities/invite';
import { InviteRepository } from '@application/repositories/invite-repository';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { PrismaInviteMapper } from '../prisma/mappers/prisma-invite-mappers';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class PrismaInviteRepository implements InviteRepository {
  constructor(
    private prisma: PrismaService,
    private eventEmmiter: EventEmitter2,
  ) {}

  async create(invite: Invite): Promise<void> {
    const raw = PrismaInviteMapper.toPrisma(invite);

    const data = await this.prisma.invite.create({
      data: { ...raw, imageUrls: [''] },
    });

    this.eventEmmiter.emit('data-invite.created');

    this.eventEmmiter
      .waitFor('imagesUrl.created')
      .then((imageUrls: string[]) =>
        this.uploadInvitePuttingImage(data.id, imageUrls),
      );
  }

  async uploadInvitePuttingImage(inviteId: string, urls: string[]) {
    return await this.prisma.invite.update({
      where: { id: inviteId },
      data: { imageUrls: urls },
    });
  }
}

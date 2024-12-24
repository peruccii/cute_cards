import { Invite } from '@application/entities/invite';
import { InviteRepository } from '@application/repositories/invite-repository';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { PrismaInviteMapper } from '../prisma/mappers/prisma-invite-mappers';

@Injectable()
export class PrismaInviteRepository implements InviteRepository {
  constructor(private prisma: PrismaService) {}

  async create(invite: Invite): Promise<void> {
    const raw = PrismaInviteMapper.toPrisma(invite);
    await this.prisma.invite.create({
      data: raw,
    });
  }

  async delete(id: string) {
    await this.prisma.invite.delete({ where: { id: id } });
  }

  async findMany(): Promise<Invite[]> {
    const invites = await this.prisma.invite.findMany();

    return invites.map((invite) => {
      return PrismaInviteMapper.toDomain(invite);
    });
  }
}

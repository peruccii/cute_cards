import { Invite } from '@application/entities/invite';
import { InviteRepository } from '@application/repositories/invite-repository';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaInviteRepository implements InviteRepository {
  constructor(private prisma: PrismaService) {}

  create(invite: Invite) {
    // TODO: CREATE WITH PRISMA
  }
}

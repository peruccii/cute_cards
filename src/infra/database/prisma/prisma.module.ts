import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { InviteRepository } from '@application/repositories/invite-repository';
import { PrismaInviteRepository } from '../repositories/prisma-invite-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: InviteRepository,
      useClass: PrismaInviteRepository,
    },
  ],
  exports: [InviteRepository],
})
export class PrismaModule {}

import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { DeleteImgsFromFirebaseSchedule } from '@infra/jobs/delete-imgs-from-firebase.schedule';
import { FirebaseModule } from '../firebase/firebase.module';
import { DeleteInviteSchedule } from '@infra/jobs/delete-invite.schedule';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [ScheduleModule.forRoot(), FirebaseModule, PrismaModule],
  providers: [
    DeleteImgsFromFirebaseSchedule,
    DeleteInviteSchedule,
    PrismaService,
  ],
  exports: [DeleteImgsFromFirebaseSchedule],
})
export class ScheduleTasksModule {}

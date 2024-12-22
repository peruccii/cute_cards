import { Module } from '@nestjs/common';
import { Firebase } from '@application/usecases/firebase-methods';
import { FirebaseRepository } from '@application/repositories/firebase-repository';

@Module({
  providers: [
    Firebase,
    {
      provide: FirebaseRepository,
      useClass: Firebase,
    },
  ],
  exports: [FirebaseRepository],
})
export class FirebaseModule {}

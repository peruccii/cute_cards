import { Module } from '@nestjs/common';
import { StripeModule } from './stripe/stripe.module';
import { HttpModule } from '@infra/http/http.module';
import { DatabaseModule } from '@infra/database/database.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    StripeModule.forRootAsync(),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    HttpModule,
    DatabaseModule,
  ],
})
export class AppModule {}

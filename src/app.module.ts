import { Module } from '@nestjs/common';
import { StripeModule } from './stripe/stripe.module';
import { HttpModule } from '@infra/http/http.module';
import { DatabaseModule } from '@infra/database/database.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    StripeModule.forRootAsync(),
    EventEmitterModule.forRoot(),
    HttpModule,
    DatabaseModule,
  ],
})
export class AppModule {}

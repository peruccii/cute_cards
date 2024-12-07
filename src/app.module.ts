import { Module } from '@nestjs/common';
import { AppController } from './infra/http/controllers/invite.controller';
import { AppService } from './app.service';
import { StripeModule } from './stripe/stripe.module';

@Module({
    imports: [StripeModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }

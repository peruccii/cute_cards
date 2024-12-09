import { Module } from '@nestjs/common';
import { StripeModule } from './stripe/stripe.module';
import { HttpModule } from '@infra/http/http.module';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
    imports: [
        StripeModule.forRootAsync(),
        HttpModule,
        DatabaseModule,
    ],
})
export class AppModule { }

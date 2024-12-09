import { Module } from '@nestjs/common';
import { InviteController } from './controllers/invite.controller';
import { PrepareInviteCheckout } from '@application/usecases/prepare-invite-checkout';
import { CreateInviteCheckoutSession } from '@application/usecases/create-checkout';
import { DatabaseModule } from '@infra/database/database.module';
import { ConfigModule } from '@nestjs/config';


@Module({
    imports: [DatabaseModule, ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env',
    })],
    controllers: [InviteController],
    providers: [
        PrepareInviteCheckout,
        CreateInviteCheckoutSession,
    ]
})
export class HttpModule { }

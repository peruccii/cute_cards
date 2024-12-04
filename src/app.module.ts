import { Module } from '@nestjs/common';
import { AppController } from './infra/http/controllers/invite.controller';
import { AppService } from './app.service';

@Module({
    imports: [],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }

import { InviteRepository } from "@application/repositories/invite-repository";
import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaInviteRepository } from "./repositories/prisma-invite-repository";
import { FirebaseRepository } from "@application/repositories/firebase-repository";
import { UploadImagesToFirebase } from "@application/usecases/upload-images-to-firebase";
import { CreateInviteCheckoutSession } from "@application/usecases/create-checkout";
import { CheckoutRepository } from "@application/repositories/checkout-repository";
import { HandleEventsStripe } from "@application/usecases/handle-events-stripe";
import { ConfigModule } from "@nestjs/config";
import { Resendmail } from "@application/usecases/mail/resend-mail.service";
import { MailRepository } from "@application/repositories/mail-repository";

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env',
    })],
    providers: [
        HandleEventsStripe,
        Resendmail,
        {
            provide: MailRepository,
            useClass: Resendmail,
        },
        CreateInviteCheckoutSession,
        {
            provide: CheckoutRepository,
            useClass: CreateInviteCheckoutSession,
        },
        UploadImagesToFirebase,
        {
            provide: FirebaseRepository,
            useClass: UploadImagesToFirebase,
        },
        PrismaService,
        {
            provide: InviteRepository,
            useClass: PrismaInviteRepository
        },
    ],
    exports: [
        InviteRepository,
        FirebaseRepository,
        CheckoutRepository,
        HandleEventsStripe,
        MailRepository, 
    ]
})
export class DatabaseModule { }

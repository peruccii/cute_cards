import { Test, TestingModule } from "@nestjs/testing";
import { Resendmail } from "./resend-mail.service";
import { ConfigService } from "@nestjs/config";
import { Email } from "@application/entities/fieldsValidations/email";
import * as dotenv from 'dotenv';
import { ResendSendMailError } from "../errors/resend-send-email-error";

describe('RESEND MAIL TEST', () => {

    let resend: Resendmail;

    beforeEach(async () => {
        dotenv.config();
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                Resendmail,
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn().mockImplementation((key: string) => {
                            if (key === 'RESEND_KEY') {
                                return process.env.RESEND_KEY;
                            }
                            return null;
                        }),
                    },
                },
            ],
        }).compile();

        resend = module.get<Resendmail>(Resendmail);

    });

    it('should be able to resend send email', async () => {
        const email = await resend.sendEmail(new Email('delivered@resend.dev'))

        const emailSend = email.data?.id

        if (!emailSend) throw new ResendSendMailError();

        expect(emailSend).toBeTruthy()
    })
})

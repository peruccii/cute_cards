import { Test, TestingModule } from '@nestjs/testing';
import { Resendmail } from './resend-mail.service';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { ResendSendMailError } from '../errors/resend-send-email-error';
import { CreateSendEmailRequest } from '@application/repositories/mail-repository';
import { randomUUID } from 'node:crypto';
import { InviteType } from '@application/entities/enums/inviteType';

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
    const request: CreateSendEmailRequest = {
      email: 'delivered@resend.dev',
      clientName: 'teste',
      inviteId: randomUUID(),
      inviteType: InviteType.LOVE,
    };

    const email = await resend.sendEmail(request);

    const emailId = email;

    if (!emailId) throw new ResendSendMailError();

    expect(emailId).toBeTruthy();
  });
});

import { makeInvite } from '@test/factories/invite-factory';
import { CreateInviteCheckoutSession } from './create-checkout';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaInviteMapper } from '@infra/database/prisma/mappers/prisma-invite-mappers';
import { Invite } from '@application/entities/invite';
import { HandleEventsStripe } from './handle-events-stripe';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MailRepository } from '@application/repositories/mail-repository';

describe('CHECKOUT TEST', () => {
  let inviteCheckout: CreateInviteCheckoutSession;

  const mailRepositoryMock = {
    sendEmail: jest.fn().mockResolvedValue({ id: 'test-id' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EventEmitterModule.forRoot()],
      providers: [
        CreateInviteCheckoutSession,
        HandleEventsStripe,
        {
          provide: ConfigService,
          useValue: {
            get: jest
              .fn()
              .mockReturnValue(
                'sk_test_51OlhIpDRwUSzYLmEkaGikIG6zekbaMlaCchGIYsikN7mZoY8nm9VAzwPg0vrXpGXSqkzdLvgGnzoQpETzO33AdRQ00bc2dMfmd',
              ),
          },
        },
        {
          provide: MailRepository,
          useValue: mailRepositoryMock,
        },
      ],
    }).compile();

    inviteCheckout = module.get<CreateInviteCheckoutSession>(
      CreateInviteCheckoutSession,
    );
  });

  it('should be able to create invite and return a stripe url string checkout', async () => {
    const invite = makeInvite();

    const prismaInvite = PrismaInviteMapper.toPrisma(invite);

    invite.verifyQuantityOfPhothosByInvitePlan(
      invite.invite_plan,
      prismaInvite.imageUrls!,
    );

    const url_checkout = await inviteCheckout.createCheckoutSession(
      prismaInvite as unknown as Invite,
    );

    expect(url_checkout).toContain('checkout.stripe.com');
  });
});

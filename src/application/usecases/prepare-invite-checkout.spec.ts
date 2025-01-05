import { makeInvite } from '@test/factories/invite-factory';
import { CreateInviteCheckoutSession } from './create-checkout';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaInviteMapper } from '@infra/database/prisma/mappers/prisma-invite-mappers';
import { HandleEventsStripe } from './handle-events-stripe';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MailRepository } from '@application/repositories/mail-repository';
import CheckoutRequest from '@application/interfaces/checkoutRequest';
import { FirebaseRepository } from '@application/repositories/firebase-repository';
import { InviteRepository } from '@application/repositories/invite-repository';

describe('CHECKOUT TEST', () => {
  let inviteCheckout: CreateInviteCheckoutSession;

  const mailRepositoryMock = {
    sendEmail: jest.fn().mockResolvedValue({ id: 'test-id' }),
  };

  const firebaseRepositoryMock = {
    delete: jest.fn(),
    uploadImages: jest.fn().mockResolvedValue(['']),
  };

  const inviteRepository = {
    create: jest.fn(),
    delete: jest.fn(),
    findMany: jest.fn().mockResolvedValue(['']),
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
        {
          provide: FirebaseRepository,
          useValue: firebaseRepositoryMock,
        },
        {
          provide: InviteRepository,
          useValue: inviteRepository,
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
      prismaInvite.image_urls,
    );

    const url_checkout = await inviteCheckout.createCheckoutSession(
      prismaInvite as unknown as CheckoutRequest,
    );

    expect(url_checkout).toContain('checkout.stripe.com');
  });
});

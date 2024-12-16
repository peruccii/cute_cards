import { MailRepository } from '@application/repositories/mail-repository';
import { HandleEventsStripe } from './handle-events-stripe';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as dotenv from 'dotenv';
import Stripe from 'stripe';

describe('HANDLE EVENTS STRIPE TEST', () => {
  let handle_events: HandleEventsStripe;

  // simulando sendEmail do repository que me devolve um id
  const mailRepositoryMock = {
    // o nome do metodo tem que existir, pois na hora que o repo real passar a ser o repo falso os metodos tem que serem o mesmo
    sendEmail: jest.fn().mockResolvedValue({ id: 'test-id' }), // o retorno tambem tem que ser o mesmo
  };

  beforeEach(async () => {
    dotenv.config();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HandleEventsStripe, // vai passar a ter o "mailRepositoryMock" como repository
        {
          provide: MailRepository, // providando o repository real para o repository falso ( mailRepositoryMock )
          useValue: mailRepositoryMock, // repository falso
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation((key: string) => {
              if (key === 'STRIPE_API_KEY') return process.env.STRIPE_API_KEY;
              if (key === 'WHSEC_STRIPE') return process.env.WHSEC_STRIPE;
              return null;
            }),
          },
        },
      ],
    }).compile();

    handle_events = module.get<HandleEventsStripe>(HandleEventsStripe);
  });

  let event: Stripe.Event;

  it('should be able to handle a session completed event', async () => {
    event = {
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'evt_1',
          customer_email: 'delivered@resend.dev',
          customer_details: { name: 'Test User' },
          metadata: {
            inviteType: 'LOVE',
            inviteId: 'id-test-01',
          },
        },
      },
    } as unknown as Stripe.Event;

    if (event.type === 'checkout.session.completed') {
      const rs = await handle_events.handleSessionCompleted(event);

      expect(rs).toEqual({ id: 'test-id' });
    }
  });
});

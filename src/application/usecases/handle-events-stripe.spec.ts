import { MailRepository } from '@application/repositories/mail-repository';
import { HandleEventsStripe } from './handle-events-stripe';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as dotenv from 'dotenv';
import Stripe from 'stripe';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { FirebaseRepository } from '@application/repositories/firebase-repository';
import { Email } from '@application/entities/fieldsValidations/email';
import { Title } from '@application/entities/fieldsValidations/title';
import { Message } from '@application/entities/fieldsValidations/message';
import { SubTitle } from '@application/entities/fieldsValidations/subTitle';
import { InviteRepository } from '@application/repositories/invite-repository';

describe('HANDLE EVENTS STRIPE TEST', () => {
  let handle_events: HandleEventsStripe;

  // simulando sendEmail do repository que me devolve um id
  const mailRepositoryMock = {
    // o nome do metodo tem que existir, pois na hora que o repo real passar a ser o repo falso os metodos tem que serem o mesmo
    sendEmail: jest.fn().mockResolvedValue({ id: 'test-id' }), // o retorno tambem tem que ser o mesmo
  };

  const firebaseRepositoryMock = {
    delete: jest.fn(),
    uploadImages: jest.fn().mockResolvedValue(['']),
    getImgUrls: jest.fn().mockResolvedValue(['', '']),
  };

  const inviteRepository = {
    create: jest.fn(),
    delete: jest.fn(),
    findMany: jest.fn().mockResolvedValue(['']),
  };

  beforeEach(async () => {
    dotenv.config();
    const module: TestingModule = await Test.createTestingModule({
      imports: [EventEmitterModule.forRoot()],
      providers: [
        HandleEventsStripe, // vai passar a ter o "mailRepositoryMock" como repository
        {
          provide: MailRepository, // providando o repository real para o repository falso ( mailRepositoryMock )
          useValue: mailRepositoryMock, // repository falso
        },
        {
          provide: FirebaseRepository, // providando o repository real para o repository falso ( mailRepositoryMock )
          useValue: firebaseRepositoryMock, // repository falso
        },
        {
          provide: InviteRepository, // providando o repository real para o repository falso ( mailRepositoryMock )
          useValue: inviteRepository, // repository falso
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
    const email = new Email('delivered@resend.dev');
    const title = new Title('Title test');
    const message = new Message('Message test');
    const subTitle = new SubTitle('SubTitle test');
    event = {
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'evt_1',
          customer_email: email.value,
          customer_details: {
            name: 'Test User',
            email: email.value,
          },
          metadata: {
            inviteType: 'LOVE',
            inviteId: 'id-test-01',
            title: title.value,
            message: message.value,
            sub_title: subTitle.value,
            email: email.value,
          },
        },
      },
    } as unknown as Stripe.Event;

    if (event.type === 'checkout.session.completed') {
      const rs = await handle_events.handleSessionCompleted(event);

      expect(rs).toEqual({ id: 'test-id' });
    }
  });

  it('should be able to handle a session expired event', async () => {
    const email = new Email('delivered@resend.dev');
    const title = new Title('Title test');
    const message = new Message('Message test');
    const subTitle = new SubTitle('SubTitle test');
    event = {
      type: 'checkout.session.expired',
      data: {
        object: {
          id: 'evt_1',
          customer_email: email.value,
          customer_details: {
            name: 'Test User',
            email: email.value,
          },
          metadata: {
            inviteType: 'LOVE',
            inviteId: 'id-test-01',
            title: title.value,
            message: message.value,
            sub_title: subTitle.value,
          },
        },
      },
    } as unknown as Stripe.Event;

    if (event.type === 'checkout.session.expired') {
      expect(async () => {
        await handle_events.handleSessionExpired(event);
      });
    }
  });

  it('should be able to handle a session payment failed event', async () => {
    const email = new Email('delivered@resend.dev');
    const title = new Title('Title test');
    const message = new Message('Message test');
    const subTitle = new SubTitle('SubTitle test');
    event = {
      type: 'checkout.session.async_payment_failed',
      data: {
        object: {
          id: 'evt_1',
          customer_email: email.value,
          customer_details: {
            name: 'Test User',
            email: email.value,
          },
          metadata: {
            inviteType: 'LOVE',
            inviteId: 'id-test-01',
            title: title.value,
            message: message.value,
            sub_title: subTitle.value,
          },
        },
      },
    } as unknown as Stripe.Event;

    if (event.type === 'checkout.session.async_payment_failed') {
      expect(async () => {
        await handle_events.handleSessionPaymentFailed(event);
      });
    }
  });
});

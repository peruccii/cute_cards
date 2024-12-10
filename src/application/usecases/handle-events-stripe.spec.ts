import Stripe from "stripe"
import { HandleEventsStripe } from "./handle-events-stripe"
import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import * as dotenv from 'dotenv';

describe('HANDLE EVENTS STRIPE TEST', () => {

    let handle_events: HandleEventsStripe;

    beforeEach(async () => {
        dotenv.config();
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                HandleEventsStripe,
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn().mockImplementation((key: string) => {
                            if (key === 'STRIPE_API_KEY') {
                                return process.env.STRIPE_API_KEY;
                            }
                            if (key === 'WHSEC_STRIPE') {
                                return process.env.WHSEC_STRIPE;
                            }
                            return null;
                        }),
                    },
                },
            ],
        }).compile();

        handle_events = module.get<HandleEventsStripe>(HandleEventsStripe);

    });

    let event: Stripe.Event

    it('should be able to handle a session completed event', async () => {

        event = {
            type: 'checkout.session.completed',
            data: {
                object: {
                    id: 'evt_1',
                    amount_total: 1000,
                },
            },
        } as Stripe.Event;

        if (event.type === 'checkout.session.completed') {
            const result = await handle_events.handleSessionCompleted(event)

            expect(result).toContain('session completed')
        }
    })
})

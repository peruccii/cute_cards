import { makeInvite } from "@test/factories/invite-factory"
import { CreateInviteCheckoutSession } from "./create-checkout"
import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";

describe('CHECKOUT TEST', () => {
    let inviteCheckout: CreateInviteCheckoutSession;
    let configService: ConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateInviteCheckoutSession,
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn().mockReturnValue('sk_test_51OlhIpDRwUSzYLmEkaGikIG6zekbaMlaCchGIYsikN7mZoY8nm9VAzwPg0vrXpGXSqkzdLvgGnzoQpETzO33AdRQ00bc2dMfmd'),
                    },
                },
            ],
        }).compile();

        inviteCheckout = module.get<CreateInviteCheckoutSession>(CreateInviteCheckoutSession);
        configService = module.get<ConfigService>(ConfigService);
    });

    it('should be able to create invite and return a stripe url string checkout', async () => {

        const invite = makeInvite()

        invite.verifyQuantityOfPhothosByInvitePlan(invite.invite_plan, invite.imageUrls);

        const url_checkout = await inviteCheckout.createCheckoutSession(invite)

        expect(url_checkout).toContain('checkout.stripe.com')
    })
})

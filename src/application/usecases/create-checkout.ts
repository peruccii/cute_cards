import Stripe from "stripe";
import { CheckoutRepository } from "@application/repositories/checkout-repository";
import { Invite } from "@application/entities/invite";


export class CreateInviteCheckoutSession implements CheckoutRepository {
    private stripe;

    constructor() {
        this.stripe = new Stripe(process.env.STRIPE_API_KEY!, {
            apiVersion: '2024-11-20.acacia'
        })
    }

    async createCheckoutSession(invite: Invite): Promise<string> {
        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `${invite.invite_type} ${invite.invite_plan}`,
                            images: ['https://example.com/image.png'],
                            metadata: {
                                urlMusic: 'https://example.com/music.mp3',
                                extraInfo: 'Some custom information',
                            },
                        },
                        unit_amount: 2000,
                    },
                    quantity: 1,
                },
            ],
            success_url: 'https://example.com/success',
            cancel_url: 'https://example.com/cancel',
        });

        return session.url
    }
}

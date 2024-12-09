import { Injectable } from "@nestjs/common";
import Stripe from "stripe";

@Injectable()
export class HandleEventsStripe {
    private stripe;

    constructor() {
        this.stripe = new Stripe(process.env.STRIPE_API_KEY!, {
            apiVersion: '2024-11-20.acacia'
        })
    }

    verifyEvent(request: any): Stripe.Event {
        const signature = request.headers['stripe-signature'];
        const endpointSecret = process.env.WHSEC_STRIPE;

        return this.stripe.webhooks.constructEvent(
            request.rawBody,
            signature,
            endpointSecret
        );
    }

    async handleSessionCompleted(event: Stripe.Event) {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`Evento de sessão completada: ${session.id}}`);
    }
}

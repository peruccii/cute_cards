import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Stripe from "stripe";

@Injectable()
export class HandleEventsStripe {
    private stripe: Stripe;

    constructor(private configService: ConfigService ) {
        this.stripe = new Stripe(this.configService.get('STRIPE_API_KEY')!, {
            apiVersion: '2024-11-20.acacia'
        })
    }

    verifyEvent(request: any): Stripe.Event {
        const signature = request.headers['stripe-signature'];
        const endpointSecret = process.env.WHSEC_STRIPE! // Todo: maybe alternate to this.config.service;

        return this.stripe.webhooks.constructEvent(
            request.rawBody,
            signature,
            endpointSecret
        );
    }

    async handleSessionCompleted(event: Stripe.Event) {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`session completed ${session.id}}`);
    }
}

import { InvitePlan } from '@application/entities/enums/invitePlan';
import { InvitePlanDetails } from '@application/entities/invite-plan-details';
import { MercadoPagoRepository } from '@application/repositories/mercado-pago-repository';
import { ConfigService } from '@nestjs/config';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { randomUUID } from 'node:crypto';

export class MercadoPago implements MercadoPagoRepository {
  constructor(private configService: ConfigService) {}

  create(plan: InvitePlan, email: string) {
    const client = new MercadoPagoConfig({
      accessToken: 'access_token',
      options: { timeout: 5000, idempotencyKey: 'abc' },
    });

    const payment = new Payment(client);

    const notificationUrl = this.configService.get('WEBHOOK_URL_DEVELOPMENT');

    const body = {
      transaction_amount: InvitePlanDetails.getPrice(plan),
      description: `Pagamento via PIX do plano ${plan}`,
      payment_method_id: 'pix',
      payer: {
        email: email,
      },
      notification_url: notificationUrl,
    };

    const requestOptions = { idempotencyKey: randomUUID() };

    payment
      .create({ body, requestOptions })
      .then((response) => {
        return response.point_of_interaction?.transaction_data?.ticket_url;
      })
      .catch(console.log);
  }

  async createWebHook(req, res) {
    console.log('Recebendo evento webhook:', req.body);

    const { action, data } = req.body;

    if (!action || !data?.id) {
      return res.status(400).send('Invalid webhook event format');
    }

    if (action === 'payment.created' || action === 'payment.updated') {
      try {
        const client = new MercadoPagoConfig({
          accessToken: 'access_token',
        });

        const payment = new Payment(client);

        // Buscar detalhes do pagamento pelo ID
        const paymentDetails = await payment.get({ id: data.id });

        const paymentStatus = paymentDetails.status_detail;

        if (paymentStatus === 'approved') {
          console.log('O PAGAMENTO FOI APROVADO E RECEBA SEU PRÊMIO!');
        } else {
          console.log(`Status do pagamento: ${paymentStatus}`);
        }

        res.status(200).send('Webhook processed successfully');
      } catch (error) {
        console.error('Erro ao processar webhook:', error);
        res
          .status(500)
          .json({ statusCode: 500, data: 'Error processing the webhook' });
      }
    } else {
      res.status(400).send('Unsupported event');
    }
  }
}

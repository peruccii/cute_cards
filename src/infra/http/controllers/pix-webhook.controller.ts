import { MercadoPago } from '@application/usecases/mercado-pago';
import { Controller, Post, Body, Res } from '@nestjs/common';

@Controller('pix')
export class PixController {
  constructor(private mercado_pagoService: MercadoPago) {}
  @Post('webhook')
  async handleWebhook(@Body() body: any, @Res() res: any) {
    try {
      const { action, data } = body;
      if (!action || !data?.id) {
        return res.status(400).send('Invalid webhook event format');
      }

      await this.mercado_pagoService.createWebHook(body, res);
    } catch (error) {
      console.error('Erro ao processar o webhook:', error);
      return res.status(500).send('Error processing webhook');
    }
  }
}

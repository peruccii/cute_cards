export default () => ({
  stripe: {
    apiKey: process.env.STRIPE_API_KEY,
    webhookSecret: process.env.WHSEC_STRIPE,
  },
  storage: {
    bucketName: process.env.STORAGE_BUCKET_NAME,
  },
  database: {
    url: process.env.DATABASE_URL,
  },
  mercadoPago: {
    accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
  },
  webhook: {
    urlDevelopment: process.env.WEBHOOK_URL_DEVELOPMENT,
  },
  resend: {
    key: process.env.RESEND_KEY,
  },
});

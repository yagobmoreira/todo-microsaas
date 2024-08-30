export const config = {
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_SECRET_WEBHOOK,
    plans: {
      free: {
        priceId: process.env.STRIPE_PLANS_FREE_PRICEID,
        quota: {
          TASKS: 5,
        },
      },
      pro: {
        priceId: process.env.STRIPE_PLANS_PRO_PRICEID,
        quota: {
          TASKS: 100,
        },
      },
    },
  },
}

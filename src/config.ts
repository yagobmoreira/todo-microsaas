export const config = {
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY,
    webhookSecret: '',
    plans: {
      free: {
        priceId: process.env.NEXT_PUBLIC_STRIPE_PLANS_FREE_PRICEID,
        quota: {
          TASKS: 5,
        },
      },
      pro: {
        priceId: process.env.NEXT_PUBLIC_STRIPE_PLANS_PRO_PRICEID,
        quota: {
          TASKS: 100,
        },
      },
    },
  },
}

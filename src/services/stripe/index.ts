import { config } from '@/config'
import Stripe from 'stripe'
import { prisma } from '../database'

export const stripe = new Stripe(config.stripe.secretKey || '', {
  apiVersion: '2024-06-20',
  httpClient: Stripe.createFetchHttpClient(),
})

export const getStripeCustomerByEmail = async (email: string) => {
  const customers = await stripe.customers.list({ email })
  return customers.data[0]
}

export const createStripeConsumer = async (input: {
  name?: string
  email: string
}) => {
  const { email, name } = input
  const customer = await getStripeCustomerByEmail(email)

  if (customer) return customer

  const createdCustomer = await stripe.customers.create({
    email,
    name,
  })

  const createdCustomerSubscription = await stripe.subscriptions.create({
    customer: createdCustomer.id,
    items: [{ price: config.stripe.plans.free.priceId }],
  })

  await prisma.user.update({
    where: {
      email,
    },
    data: {
      stripeCustomerId: createdCustomer.id,
      stripeSubscriptionId: createdCustomerSubscription.id,
      stripeSubscriptionStatus: createdCustomerSubscription.status,
      stripePriceId: config.stripe.plans.free.priceId,
    },
  })

  return createdCustomer
}

export const createCheckoutSession = async (
  userId: string,
  userEmail: string,
) => {
  try {
    const customer = await createStripeConsumer({ email: userEmail })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      client_reference_id: userId,
      customer: customer.id,
      success_url: `http://localhost:3000/app/settins/billing?success=true`,
      cancel_url: `http://localhost:3000/app/settins/billing?success=false`,
      line_items: [
        {
          price: config.stripe.plans.pro.priceId,
          quantity: 1,
        },
      ],
    })

    return {
      url: session.url,
    }
  } catch (error) {
    throw new Error('Error to create checkout session')
  }
}

import { stripe } from '../../../lib/stripe'

export async function POST(request) {
  try {
    const { processingTime, imageUrl } = await request.json();
    const priceId = processingTime === '15h' 
      ? process.env.STRIPE_PRICE_ID_15H 
      : process.env.STRIPE_PRICE_ID_48H

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/#Product`,
      metadata: {
        imageUrl,
        processingTime
      }
    })

    return Response.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
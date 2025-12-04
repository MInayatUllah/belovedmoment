import { stripe } from '../../../../lib/stripe'
import { supabaseAdmin } from '../../../../lib/supabase'

export async function POST(request) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      
      const { customer_email, amount_total, id: sessionId } = session

      const { data: orderData, error: orderError } = await supabaseAdmin
        .from('orders')
        .insert({
          email: customer_email,
          stripe_session_id: sessionId,
          image_url: null,
          processing_time: '48h',
          amount: amount_total,
          status: 'pending'
        })
        .select()
        .single()

      if (orderError) {
        throw new Error(`Order creation failed: ${orderError.message}`)
      }

      return Response.json({ success: true, orderId: orderData.id })
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
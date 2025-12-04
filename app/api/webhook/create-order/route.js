import { stripe } from '../../../../lib/stripe'
import { supabaseAdmin } from '../../../../lib/supabase'

export async function POST(request) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      
      // Get session details
      const { customer_email, amount_total, id: sessionId } = session

      // Create order in database (without image for now - will be updated later)
      const { data: orderData, error: orderError } = await supabaseAdmin
        .from('orders')
        .insert({
          email: customer_email,
          stripe_session_id: sessionId,
          image_url: null, // Will be updated when image is uploaded
          processing_time: '48h', // Default for now
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
import { sendContactFormEmail } from '../../../lib/email'

export async function POST(request) {
  try {
    const { email, message } = await request.json()

    if (!email || !message) {
      return Response.json({ error: 'Email and message are required' }, { status: 400 })
    }

    const result = await sendContactFormEmail(email, message)

    if (!result.success) {
      throw new Error(result.error)
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
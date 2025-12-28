import Link from 'next/link';
import { stripe } from '../../lib/stripe';
import { supabaseAdmin } from '../../lib/supabase';
import { redirect } from 'next/navigation';

async function getOrderDetails(sessionId: string) {
  if (!sessionId) return null;

  try {
    // 1. Fetch Stripe Session to get basic details immediately
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // 2. Get invoice URL if available
    let invoiceUrl = null;
    if (session.invoice) {
      try {
        const invoice = await stripe.invoices.retrieve(session.invoice as string);
        invoiceUrl = invoice.hosted_invoice_url;
      } catch (e) {
        console.error('Invoice retrieval failed:', e);
      }
    }

    // 3. Fetch Supabase Order
    let order = null;
    if (supabaseAdmin) {
      const { data } = await supabaseAdmin
        .from('orders')
        .select('*')
        .eq('session_id', sessionId)
        .single();
      order = data;
    }

    return {
      session,
      order,
      invoiceUrl
    };
  } catch (error) {
    console.error('Error fetching order details:', error);
    return null;
  }
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  const sessionId = params.session_id as string;

  if (!sessionId) {
    // Debugging: Show error instead of redirecting
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <h1 className="text-xl font-bold text-yellow-600 mb-4">Debugging: No Session ID</h1>
          <p className="text-gray-600 mb-4">
            You reached the success page, but no <code>session_id</code> was found in the URL.
          </p>
          <p className="text-sm text-gray-500">
            Check your Stripe Dashboard &gt; Developers &gt; Logs to see the redirect URL.
          </p>
          <div className="mt-6">
            <Link href="/" className="text-blue-600 hover:underline">Return Home</Link>
          </div>
        </div>
      </div>
    );
  }

  const data = await getOrderDetails(sessionId);

  if (!data?.session) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <h1 className="text-xl font-bold text-red-600 mb-4">Invalid Session</h1>
          <Link href="/" className="text-blue-600 hover:underline">Return Home</Link>
        </div>
      </div>
    )
  }

  const { session, order, invoiceUrl } = data;
  const totalAmount = session.amount_total ? (session.amount_total / 100).toFixed(2) : '0.00';
  const currency = session.currency?.toUpperCase() || 'GBP';

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">

        {/* Success Header */}
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-500 text-lg">
            Thanks for your purchase. We're working on it!
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Order Details
            </h2>

            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-mono font-medium text-gray-900">
                {order?.id ? `#${order.id}` : <span className="text-orange-500 italic">Processing...</span>}
              </span>
            </div>

            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Status:</span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                Paid
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Email:</span>
              <span className="text-gray-900 font-medium">
                {session.customer_details?.email || order?.email || 'N/A'}
              </span>
            </div>
          </div>

          {/* Breakdown */}
          <div className="p-6 bg-gray-50/50">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Purchase Summary
            </h2>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-800 font-medium">Photo to Video Transformation</span>
              <span className="text-gray-900 font-bold">{currency} {totalAmount}</span>
            </div>
            {session.metadata?.processingTime && (
              <div className="text-sm text-gray-500">
                Speed: {session.metadata.processingTime === '15h' ? 'Express (24h)' : 'Standard (36h)'}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4 pt-4">
          <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
            <svg className="w-6 h-6 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-blue-800">
              You currently have an Order ID of <strong>{order?.id || 'Pending'}</strong>.
              {!order?.id && " If it says Pending, don't worry! It will appear in your email shortly."}
              <br />
              Please keep this for your reference.
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg flex items-start gap-3">
            <svg className="w-6 h-6 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-green-800">
              A confirmation email with your order details and invoice has been sent to <strong>{session.customer_details?.email || order?.email}</strong>.
            </p>
          </div>

          {/* Download Invoice Button */}
          {invoiceUrl && (
            <a
              href={invoiceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium text-center transition-colors"
            >
              Download Invoice
            </a>
          )}

          <Link
            href="/"
            className="block w-full bg-black text-white py-4 px-6 rounded-xl font-bold text-center hover:bg-gray-800 transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
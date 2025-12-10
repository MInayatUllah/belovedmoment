export default function ReturnRefundPolicy() {
  return (
    <div className="min-h-screen bg-white text-black py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Return & Refund Policy</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Revisions</h2>
            <div className="text-gray-700 space-y-4">
              <p>At Beloved Moment, we want you to feel happy and confident with your final creation. Every order includes one (1) complimentary revision to address any changes you'd like to see in your photo or video.</p>
              <p>If you require additional changes beyond the included revision, these may be subject to an additional fee, depending on the request.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Money-Back Guarantee</h2>
            <div className="text-gray-700 space-y-4">
              <p>All orders are protected by our 100% Money-Back Guarantee in the event that we are unable to deliver an acceptable final result.</p>
              <p>This means:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>We will always make every reasonable effort to revise and adjust your photo or video to match your expectations.</li>
                <li>A refund will only be issued after all available revision options have been used and we are still unable to meet your request.</li>
                <li>Once a refund is approved, the payment will be returned through your original method of payment.</li>
              </ul>
              <p>Our goal is simple: you either receive a beautifully finished memory — or you receive your money back.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Chargebacks & Payment Disputes</h2>
            <div className="text-gray-700 space-y-4">
              <p>If a chargeback or payment dispute is opened through PayPal, a credit card provider, or any other payment platform, we kindly request that it be closed once proof of delivery has been provided.</p>
              <p>In the event that a dispute is not withdrawn after evidence of completion is submitted, you agree that Beloved Moment may provide the relevant payment provider with documentation of the delivered product and these terms in order to resolve the matter.</p>
              <p>You also agree to accept responsibility for any loss or damage caused by an unresolved or fraudulent dispute.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Revision Limits</h2>
            <div className="text-gray-700 space-y-4">
              <p>Each product is eligible for the number of revisions stated on our website at the time of purchase. Please make sure to review your chosen plan or package carefully before completing your order.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-white text-black py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Shipping Policy</h1>
        {/* test */}
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Delivery Time & Process</h2>
            <div className="text-gray-700 space-y-4">
              <p>Your completed, digitally edited photo/video will be delivered within 36 working hours, depending on the package you select at checkout.</p>
              <p>The final file will be sent directly to the email address provided during your order. Please ensure your email is entered correctly to avoid any delays.</p>
              <p>If you do not receive your video within the specified timeframe, we recommend first checking your spam or junk folder. If you're still unable to locate it, please don't hesitate to contact our support team, and we'll be happy to assist you.</p>
              <p>Your memories are important to us, and we work carefully to deliver every order on time and with care.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
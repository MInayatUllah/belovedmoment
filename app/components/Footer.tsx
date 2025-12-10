import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-blue-500/20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block hover:text-blue-400">Home</Link>
              <Link href="#Product" className="block hover:text-blue-400">Order Now</Link>
              <Link href="/before-after" className="block hover:text-blue-400">Before & After</Link>
              <Link href="#how-it-works" className="block hover:text-blue-400">How it works</Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Support</h3>
            <div className="space-y-2">
              <Link href="/#FAQ" className="block hover:text-blue-400">FAQ</Link>
              <Link href="/terms-conditions" className="block hover:text-blue-400">Terms & Conditions</Link>
              <Link href="/privacy-policy" className="block hover:text-blue-400">Privacy Policy</Link>
              <Link href="/return-refund-policy" className="block hover:text-blue-400">Return & Refund</Link>
              <Link href="/shipping-policy" className="block hover:text-blue-400">Shipping Policy</Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-blue-400">
                <span className="sr-only">Instagram</span>
                📷
              </a>
              <a href="#" className="text-white hover:text-blue-400">
                <span className="sr-only">Facebook</span>
                📘
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-blue-500/20 text-center">
          <p>&copy; 2024 Beloved Moment. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="text-white relative overflow-hidden border-t border-white/15" style={{ backgroundColor: 'lab(23 28.14 -32.02)' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <img src="/logos/Beloved Moment Logo transparent.svg" alt="Beloved Moment" className="h-8 sm:h-10" />
            </div>
            <p className="text-purple-200 text-sm leading-relaxed mb-4">
              Transform your cherished photos into living memories with AI-powered animation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <span className="text-lg">📷</span>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <span className="text-lg">📘</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-white">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block hover:text-purple-300 text-sm md:text-base py-1 transition-colors">Home</Link>
              <Link href="/#Order" className="block hover:text-purple-300 text-sm md:text-base py-1 transition-colors">Order Now</Link>
              <Link href="/#reviews" className="block hover:text-purple-300 text-sm md:text-base py-1 transition-colors">Before & After</Link>
              <Link href="#how-it-works" className="block hover:text-purple-300 text-sm md:text-base py-1 transition-colors">How it works</Link>
              <Link href="/contact-us" className="block hover:text-purple-300 text-sm md:text-base py-1 transition-colors">Contact</Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-white">Support</h3>
            <div className="space-y-2">
              <Link href="/#faq" className="block hover:text-purple-300 text-sm md:text-base py-1 transition-colors">FAQ</Link>
              <Link href="/terms-conditions" className="block hover:text-purple-300 text-sm md:text-base py-1 transition-colors">Terms & Conditions</Link>
              <Link href="/privacy-policy" className="block hover:text-purple-300 text-sm md:text-base py-1 transition-colors">Privacy Policy</Link>
              <Link href="/return-refund-policy" className="block hover:text-purple-300 text-sm md:text-base py-1 transition-colors">Return & Refund</Link>
              <Link href="/shipping-policy" className="block hover:text-purple-300 text-sm md:text-base py-1 transition-colors">Shipping Policy</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-white">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:support@belovedmoment.com" className="text-sm text-purple-200 hover:text-white transition-colors">
                  support@belovedmoment.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-purple-200">24-36 hours response</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-purple-300/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-purple-200 text-center md:text-left">
            &copy; 2024 Beloved Moment. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map((i) => (
                <span key={i} className="text-yellow-400 text-sm">★</span>
              ))}
            </div>
            <span className="text-sm text-purple-200">4.8/5 from 2,785 reviews</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
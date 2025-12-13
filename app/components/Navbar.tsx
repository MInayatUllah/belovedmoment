'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

export default function Navbar() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const helpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (helpRef.current && !helpRef.current.contains(event.target as Node)) {
        setIsHelpOpen(false);
      }
    };

    if (isHelpOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isHelpOpen]);

  return (
    <>
      <nav className="sticky top-1 z-50 mx-auto w-[95%] sm:w-[90%] md:w-[80%] max-w-7xl">
        <div className="my-1 grid w-full gap-2 rounded-full border px-3 py-2 sm:px-1.5 sm:py-1.5 md:py-0 backdrop-blur-xl transition md:pl-3 border-white/10 bg-purple-900/40 mt-4">
          <div className="px-2 sm:px-4 md:px-6 lg:px-8">
            <div className="flex justify-between items-center h-10 sm:h-14 md:h-16">
              <Link href="/" className="flex items-center">
                <img src="/logos/Beloved Moment Logo transparent.svg" alt="Beloved Moment" className="h-6 sm:h-8 md:h-10" />
              </Link>
              
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                <Link href="/#Reviewes" className="text-white hover:text-purple-300 text-sm md:text-base font-medium transition-all duration-200 hover:scale-105">
                  Before & After
                </Link>
                <Link href="#how-it-works" className="text-white hover:text-purple-300 text-sm md:text-base font-medium transition-all duration-200 hover:scale-105">
                  How it works
                </Link>
                
                <div className="relative" ref={helpRef}>
                  <button
                    onClick={() => setIsHelpOpen(!isHelpOpen)}
                    className="text-white hover:text-purple-300 text-sm md:text-base font-medium transition-all duration-200 hover:scale-105 flex items-center gap-1"
                  >
                    Help 
                    <svg className={`w-4 h-4 transition-transform duration-200 ${isHelpOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isHelpOpen && (
                    <div className="absolute top-full right-0 mt-2 w-64 rounded-2xl border border-white/15 bg-[#392256] backdrop-blur-xl overflow-hidden">
                      <div className="p-4 space-y-2">
                        <Link href="/#FAQ" className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-all duration-200 cursor-pointer font-sm">
                          Freequently Asked Questions
                        </Link>
                        <Link href="/shipping-policy" className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-all duration-200 cursor-pointer">
                          Shipping Policy
                        </Link>
                        <Link href="/privacy-policy" className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-all duration-200 cursor-pointer">
                          Privacy Policy
                        </Link>
                        <Link href="/return-refund-policy" className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-all duration-200 cursor-pointer">
                          Return & Refund
                        </Link>
                        <Link href="/terms-conditions" className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-all duration-200 cursor-pointer">
                          Terms & Conditions
                        </Link>
                        <Link href="/contact" className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-all duration-200 cursor-pointer">
                          Contact Us
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                
                <Link 
                  href="#Product" 
                  className="bg-white hover:bg-gray-100 text-black px-4 py-2 md:px-6 md:py-2 rounded-[50px] text-sm md:text-base"
                >
                  Order Now
                </Link>
              </div>

              {/* Mobile Menu */}
              <div className="flex md:hidden items-center space-x-3">
                <Link 
                  href="#Product" 
                  className="bg-white hover:bg-gray-100 text-black px-3 py-1.5 rounded-[50px] text-sm font-medium "
                >
                  Order Now
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-white p-1"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
        <div className={`fixed right-0 top-0 h-full w-80 bg-gradient-to-b from-purple-900/95 to-slate-900/95 backdrop-blur-xl border-l border-purple-500/30 shadow-2xl transform transition-all duration-500 ease-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex justify-between items-center p-6 border-b border-purple-500/30 bg-purple-800/20">
              <img src="/logos/Beloved Moment Logo transparent.svg" alt="Beloved Moment" className="h-8" />
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-purple-300 p-2 rounded-full hover:bg-white/10 transition-all duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <Link href="/#Reviewes" className="flex items-center gap-3 text-white hover:text-purple-300 py-3 px-4 rounded-xl hover:bg-white/10 transition-all duration-200 group" onClick={() => setIsMobileMenuOpen(false)}>
                  <span className="font-medium">Before & After</span>
                </Link>
                <Link href="#how-it-works" className="flex items-center gap-3 text-white hover:text-purple-300 py-3 px-4 rounded-xl hover:bg-white/10 transition-all duration-200 group" onClick={() => setIsMobileMenuOpen(false)}>
                  <span className="font-medium">How it works</span>
                </Link>
              </div>
              <div className="border-t border-purple-500/30 pt-6">
                <p className="text-purple-300 text-sm font-semibold mb-4 px-4">Help & Support</p>
                <div className="space-y-2">
                  <Link href="/#FAQ" className="flex items-center gap-3 text-white/90 hover:text-white py-2 px-4 rounded-lg hover:bg-white/5 transition-all duration-200 text-sm" onClick={() => setIsMobileMenuOpen(false)}>
                    FAQ
                  </Link>
                  <Link href="/shipping-policy" className="flex items-center gap-3 text-white/90 hover:text-white py-2 px-4 rounded-lg hover:bg-white/5 transition-all duration-200 text-sm" onClick={() => setIsMobileMenuOpen(false)}>
                    Shipping Policy
                  </Link>
                  <Link href="/privacy-policy" className="flex items-center gap-3 text-white/90 hover:text-white py-2 px-4 rounded-lg hover:bg-white/5 transition-all duration-200 text-sm" onClick={() => setIsMobileMenuOpen(false)}>
                    Privacy Policy
                  </Link>
                  <Link href="/return-refund-policy" className="flex items-center gap-3 text-white/90 hover:text-white py-2 px-4 rounded-lg hover:bg-white/5 transition-all duration-200 text-sm" onClick={() => setIsMobileMenuOpen(false)}>
                    Return & Refund
                  </Link>
                  <Link href="/terms-conditions" className="flex items-center gap-3 text-white/90 hover:text-white py-2 px-4 rounded-lg hover:bg-white/5 transition-all duration-200 text-sm" onClick={() => setIsMobileMenuOpen(false)}>
                    Terms & Conditions
                  </Link>
                  <Link href="/contact" className="flex items-center gap-3 text-white/90 hover:text-white py-2 px-4 rounded-lg hover:bg-white/5 transition-all duration-200 text-sm" onClick={() => setIsMobileMenuOpen(false)}>
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
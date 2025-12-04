'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <nav className="sticky top-2 z-50 mx-auto w-[80%] max-w-7xl">
      <div className="my-2 grid w-full gap-2 rounded-full border px-1.5 py-1.5 sm:py-0 backdrop-blur-xl transition md:pl-3 border-white/10 bg-white/5">
        <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-white font-bold text-xl">
            Beloved Moment
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/before-after" className="text-white hover:text-blue-400">
              Before & After
            </Link>
            <Link href="#how-it-works" className="text-white hover:text-blue-400">
              How it works
            </Link>
            
            <div className="relative">
              <button
                onClick={() => setIsHelpOpen(!isHelpOpen)}
                className="text-white hover:text-blue-400"
              >
                Help ▼
              </button>
              {isHelpOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-black border border-blue-500/20 rounded-md shadow-lg">
                  <Link href="/faq" className="block px-4 py-2 text-white hover:bg-blue-500/20">FAQ</Link>
                  <Link href="/terms" className="block px-4 py-2 text-white hover:bg-blue-500/20">Terms & Conditions</Link>
                  <Link href="/privacy" className="block px-4 py-2 text-white hover:bg-blue-500/20">Privacy Policy</Link>
                  <Link href="/returns" className="block px-4 py-2 text-white hover:bg-blue-500/20">Return & Refund</Link>
                  <Link href="/contact" className="block px-4 py-2 text-white hover:bg-blue-500/20">Contact Us</Link>
                </div>
              )}
            </div>
            
            <Link 
              href="#Product" 
              className="bg-white hover:bg-white-700 text-black px-6 py-2 rounded-md"
            >
              Order Now
            </Link>
          </div>
        </div>
        </div>
      </div>
    </nav>
  );
}
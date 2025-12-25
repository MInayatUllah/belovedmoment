'use client';

import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 z-50 shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm">
          We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
        </p>
        <div className="flex gap-2">
          <button
            onClick={declineCookies}
            className="bg-transparent border border-white text-white px-6 py-2 rounded hover:bg-white hover:text-black transition-colors whitespace-nowrap cursor-pointer"
          >
            Decline
          </button>
          <button
            onClick={acceptCookies}
            className="bg-white text-black px-6 py-2 rounded hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
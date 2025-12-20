'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ProductSection() {
  const [selectedTime, setSelectedTime] = useState('36h');
  const [uploadedFile, setUploadedFile] = useState<{file: File, dataUrl: string, url: string} | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [shouldShine, setShouldShine] = useState(false);

  const price = selectedTime === '36h' ? 9.99 : 14.99;
  const originalPrice = selectedTime === '36h' ? 24.99 : 37.99;

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#Order') {
        setShouldShine(true);
        setTimeout(() => setShouldShine(false), 2000);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      
      try {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        
        const { url } = await response.json();
        
        const reader = new FileReader();
        reader.onload = () => {
          setUploadedFile({
            file,
            dataUrl: reader.result as string,
            url
          });
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Upload error:', error);
        setIsUploading(false);
      }
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  const handleCheckout = async () => {
    if (!uploadedFile) return;
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          processingTime: selectedTime,
          imageUrl: uploadedFile.url
        })
      });
      
      const { url } = await response.json();
      
      window.location.href = url;
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <section id="Product" className="py-20 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)] bg-[radial-gradient(circle_at_70%_80%,rgba(255,182,193,0.1),transparent_50%)]"></div>
      
      <div className="relative z-10 container mx-auto px-4 max-w-5xl">
        
        {/* 1. Video Section */}
        <div className="mb-12 text-center">
          <div className="relative inline-block">
            <div 
              className="w-full h-auto md:w-200 md:h-90 bg-black rounded-[30px] overflow-hidden relative cursor-pointer"
              onClick={() => document.querySelector('section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <img 
                src="/gifs/Header 1.gif" 
                alt="Example Video" 
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-black/50"></div>
              <div className="absolute bottom-8 left-8 flex items-center gap-3">
                <button className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer">
                  <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
                <span className="text-white font-medium">See more Video</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Heading and Para */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6 leading-tight">
            Transform Your Photos Into Living Memories
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto px-4 leading-relaxed">
            We'll turn your old picture into a 10 second emotional video, delivered when you choose.
          </p>
        </div>

        {/* 3. Rating Section */}
        <div className="text-center mb-8" id="Order">
          <div className="flex items-center justify-center gap-1 mb-2">
            {[1,2,3,4].map((i) => (
              <span key={i} className="text-yellow-400 text-2xl">★</span>
            ))}
            <div className="relative text-2xl">
              <span className="text-gray-300">★</span>
              <span className="absolute inset-0 text-yellow-400 overflow-hidden" style={{width: '50%'}}>★</span>
            </div>
          </div>
          <p className="text-gray-700 text-lg">
            <span className="font-bold">4.8</span> (2,785 reviews)
          </p>
        </div>

        {/* 4. Pricing Card */}
        <div className={`relative group mb-12`}>
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
          <div className={`relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 overflow-hidden transition-all duration-500 ${
            shouldShine ? 'shadow-3xl ring-4 ring-yellow-400/50 scale-[1.02]' : ''
          }`}>
            {shouldShine && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/40 to-transparent animate-pulse"></div>
            )}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
          <div className="relative flex items-center justify-between mb-8">
            <div>
              <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">Total Price</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-2">
                  <p className="text-3xl sm:text-4xl font-bold text-black">£{price}</p>
                  <span className="text-gray-400 text-lg sm:text-xl line-through">£{originalPrice}</span>
                  <div className="bg-red-500 text-white px-2 py-1 rounded-[50px] text-[8px] sm:text-[12px] font-bold">
                    60% OFF TODAY
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-green-100 border border-green-500 text-green-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
               Premium Quality
            </div>
          </div>

          {/* Delivery Speed */}
          <div className="mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-black mb-3">Delivery Speed</h3>
            <div className="flex gap-2 sm:gap-3 justify-center">
              
              <button
                onClick={() => setSelectedTime('15h')}
                className={`p-3 sm:p-4 rounded-xl border-2 transition-all relative w-[140px] sm:w-[180px] md:w-[200px] cursor-pointer ${
                  selectedTime === '15h' 
                    ? 'border-[lab(23%_28.14_-32.02_/_0.8)]' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="absolute top-[-12px] left-1/2 -translate-x-1/2 bg-[lab(23%_28.14_-32.02)] text-white  w-[80%] md:text-[9px] md:w-auto px-2 py-1 rounded-full text-[9px]">
                  POPULAR +$5
                </div>
                <div className="text-center">
                  <p className="font-semibold text-black text-[24px]">24h</p>
                  <p className="text-sm text-gray-600">Express</p>
                </div>
              </button>

              <button
                onClick={() => setSelectedTime('36h')}
                className={`p-3 sm:p-4 md:p-6 rounded-xl border-2 transition-all w-[140px] sm:w-[180px] md:w-[200px] cursor-pointer ${
                  selectedTime === '36h' 
                    ? 'border-[lab(23%_28.14_-32.02_/_0.8)] bg-purple-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <p className="font-semibold text-black text-[24px]">36h</p>
                  <p className="text-xs sm:text-sm text-gray-600">Standard</p>
                </div>
              </button>
            </div>
          </div>
        </div>
        </div>

        {/* Payment Cards */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2">
            {/* Visa */}
            <div className="w-12 h-8 bg-white rounded border border-gray-200 flex items-center justify-center p-1">
              <svg className="w-full h-full" viewBox="0 0 40 24" fill="none">
                <path d="M8 8h3l2 8h-2.5l-2-8zm6 0l-1.5 8h2.5l1.5-8h-2.5zm4.5 0c-.5 0-1 .3-1.2.8l-2 7.2h2.5l.5-1.5h3l.3 1.5h2.2l-2-8h-2.3zm.3 4.5l.8-2.5.5 2.5h-1.3zm5.7-4.5l-2 8h2.5l2.8-5 .7 5h2.2l1-8h-2.2l-1.8 5-.9-5h-2.3z" fill="#1A1F71"/>
              </svg>
            </div>
            {/* Mastercard */}
            <div className="w-12 h-8 bg-white rounded border border-gray-200 flex items-center justify-center p-1">
              <svg className="w-full h-full" viewBox="0 0 40 24" fill="none">
                <circle cx="15" cy="12" r="6" fill="#EB001B"/>
                <circle cx="25" cy="12" r="6" fill="#F79E1B"/>
                <path d="M20 7c1.3 1.1 2.1 2.8 2.1 4.8s-.8 3.7-2.1 4.8c-1.3-1.1-2.1-2.8-2.1-4.8S18.7 8.1 20 7z" fill="#FF5F00"/>
              </svg>
            </div>
            {/* American Express */}
            <div className="w-12 h-8 bg-white rounded border border-gray-200 flex items-center justify-center p-1">
              <svg className="w-full h-full" viewBox="0 0 40 24" fill="none">
                <rect width="40" height="24" rx="2" fill="#006FCF"/>
                <path d="M6 7h3l.8 1.5L10.6 7H14v6h-2.5V9.5l-.8 1.5h-1.4l-.8-1.5V13H6V7zm8 0h5v1.5h-3.5v.8h3.5v1.5h-3.5v.7h3.5V13h-5V7zm7 0h2.5l1.5 3 1.5-3H28l-2.5 6h-2.5L21 7z" fill="white"/>
              </svg>
            </div>
            {/* PayPal */}
            <div className="w-12 h-8 bg-white rounded border border-gray-200 flex items-center justify-center p-1">
              <svg className="w-full h-full" viewBox="0 0 40 24" fill="none">
                <path d="M8 7h5c2.5 0 4 1.5 4 3.5 0 2-1.5 3.5-4 3.5h-2l-.8 3H8.5L8 7zm2.5 5h2c1 0 1.8-.8 1.8-1.8S13.5 8.5 12.5 8.5h-2L10.5 12z" fill="#003087"/>
                <path d="M18 7h5c2.5 0 4 1.5 4 3.5 0 2-1.5 3.5-4 3.5h-2l-.8 3H18.5L18 7zm2.5 5h2c1 0 1.8-.8 1.8-1.8S23.5 8.5 22.5 8.5h-2L20.5 12z" fill="#009CDE"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="mb-8">
          {!uploadedFile && !isUploading && (
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center bg-white hover:border-purple-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-lg font-semibold text-black mb-1">Drop your photo here</p>
                <p className="text-gray-500 text-sm">or click to browse • PNG, JPG up to 10MB</p>
              </label>
            </div>
          )}

          {isUploading && (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                </div>
                <div>
                  <p className="text-blue-900 font-semibold">Uploading your photo...</p>
                  <p className="text-blue-600 text-sm">Please wait a moment</p>
                </div>
              </div>
            </div>
          )}

          {uploadedFile && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-green-900 font-semibold">{uploadedFile.file.name}</p>
                  <p className="text-green-600 text-sm">Ready to transform into video</p>
                </div>
              </div>
              <button onClick={removeFile} className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>


        <div className="text-center">
          <button 
            onClick={handleCheckout}
            className={`bg-[lab(23%_28.14_-32.02)] px-8 py-3 text-white rounded-[50px] font-semibold transition-all flex items-center gap-3 mx-auto text-lg ${
              uploadedFile 
                ? 'hover:bg-[lab(23%_28.14_-32.02_/_0.9)] cursor-pointer' 
                : 'cursor-not-allowed opacity-50'
            }`}
            disabled={!uploadedFile}
          >
            <span>Complete Your Order</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13v6a2 2 0 002 2h6M9 19v2m4-2v2" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
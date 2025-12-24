'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function ProductSection() {
  const [selectedTime, setSelectedTime] = useState('36h');
  const [uploadedFile, setUploadedFile] = useState<{ file: File, dataUrl: string, url: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [shouldShine, setShouldShine] = useState(false);

  const videos = [
    '/gifs/1.gif',
    '/gifs/2.gif',
    '/gifs/3.gif'
  ];

  const price = selectedTime === '36h' ? 9.99 : 11.99;
  const originalPrice = selectedTime === '36h' ? 24.99 : 29.99;

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
              className="w-full h-auto bg-black rounded-[30px] overflow-hidden relative cursor-pointer"
              onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <div className="relative w-[90%] m-auto py-4">
                <Swiper
                  modules={[Autoplay]}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  loop={true}
                  speed={1000}
                  className="w-full"
                >
                  {videos.map((video, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={video}
                        alt={`Demo video ${index + 1}`}
                        className="w-full h-auto object-contain max-h-[70vh]"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="absolute inset-0 bg-black/50"></div>
              <div className="absolute bottom-8 left-8 flex items-center gap-3">
                <button className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer">
                  <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
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
            {[1, 2, 3, 4].map((i) => (
              <span key={i} className="text-yellow-400 text-2xl">★</span>
            ))}
            <div className="relative text-2xl">
              <span className="text-gray-300">★</span>
              <span className="absolute inset-0 text-yellow-400 overflow-hidden" style={{ width: '50%' }}>★</span>
            </div>
          </div>
          <p className="text-gray-700 text-lg">
            <span className="font-bold">4.8</span> (2,785 reviews)
          </p>
        </div>

        {/* 4. Pricing Card */}
        <div className={`relative group mb-12`}>
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
          <div className={`relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 overflow-hidden transition-all duration-500 ${shouldShine ? 'shadow-3xl ring-4 ring-yellow-400/50 scale-[1.02]' : ''
            }`}>
            {shouldShine && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/40 to-transparent animate-pulse"></div>
            )}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
            <div className="relative mb-8">
              {/* <div className="absolute top-1 right-1 bg-green-100 border border-green-500 text-green-700 px-2 py-1 rounded-full text-[10px] sm:text-xs font-bold">
                Premium Quality
              </div> */}
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
            </div>

            {/* Delivery Speed */}
            <div className="mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-black mb-3">Delivery Time</h3>
              <div className="flex gap-2 sm:gap-3 justify-center">
                <button
                  onClick={() => setSelectedTime('36h')}
                  className={`p-3 sm:p-4 md:p-6 rounded-xl border-2 transition-all w-[140px] sm:w-[180px] md:w-[200px] cursor-pointer ${selectedTime === '36h'
                    ? 'border-[lab(23%_28.14_-32.02_/_0.8)] bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                  <div className="text-center">
                    <p className="font-semibold text-black text-[24px]">36 <span className='text-sm'>hours</span></p>
                    <p className="text-xs sm:text-sm text-gray-600">Standard</p>
                  </div>
                </button>
                <button
                  onClick={() => setSelectedTime('15h')}
                  className={`p-3 sm:p-4 rounded-xl border-2 transition-all relative w-[140px] sm:w-[180px] md:w-[200px] cursor-pointer group ${selectedTime === '15h'
                    ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-xl shadow-purple-100 ring-2 ring-purple-500 ring-offset-2 transform scale-[1.02]'
                    : 'border-gray-200 hover:border-purple-300 hover:shadow-lg'
                    }`}
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white w-max px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-md tracking-wide">
                    FASTEST +£2
                  </div>
                  <div className="text-center">
                    <p className={`font-bold text-[24px] ${selectedTime === '15h' ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600' : 'text-black'}`}>24 <span className='text-sm'>hours</span></p>
                    <p className={`text-sm`}>Express</p>
                    <div className="hidden sm:block text-[10px] text-gray-400 mt-1">Delivery tomorrow</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Cards */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {/* Visa */}
            <div className="w-16 h-11 bg-white rounded-lg border border-gray-200 flex items-center justify-center p-2.5 shadow-sm hover:shadow-md transition-shadow">
              <svg viewBox="0 0 48 16" fill="none" className="w-[85%] h-auto max-w-full" preserveAspectRatio="xMidYMid meet">
                <path d="M20.5 1.5L17.8 14.5H14.2L16.9 1.5H20.5ZM32.8 9.3C32.8 10.9 31.3 11.8 29.3 11.8C27.8 11.8 26.8 11.4 26 10.9L26.5 8.2C27.3 8.7 28.4 9.1 29.5 9.1C30.3 9.1 30.9 8.9 30.9 8.4C30.9 7.9 30.3 7.7 29.4 7.3C27.6 6.6 26.3 5.6 26.3 3.9C26.3 1.8 28.2 0.3 31.3 0.3C32.7 0.3 33.8 0.6 34.6 1L34.1 3.6C33.4 3.2 32.5 2.9 31.4 2.9C30.7 2.9 30.2 3.1 30.2 3.5C30.2 4 31 4.2 32 4.7C34 5.5 35.1 6.4 35.1 8.2C35.1 10.5 33.2 12 29.9 12C28.3 12 26.9 11.6 25.9 11.1L26.4 8.4C27.4 8.9 28.7 9.3 30 9.3C30.9 9.3 32.8 9.3 32.8 9.3ZM40.5 9.8C40.8 8.9 42.1 5.2 42.1 5.2C42.1 5.2 42.3 4.5 42.5 4L42.7 5C42.7 5 43.4 8.2 43.6 9.8H40.5ZM44.8 14.5H48L45.2 1.5H42.3C41.6 1.5 41.1 1.7 40.8 2.4L35.5 14.5H39.2L40 12.3H44.4L44.8 14.5ZM13.5 1.5L9.9 10.2L9.5 8.1C8.9 6.2 7.1 4.1 5.1 3L8.3 14.5H12.1L18.1 1.5H13.5Z" fill="#1434CB" />
                <path d="M7.5 1.5H0.5L0.4 1.9C4.9 2.9 8 5.4 9.3 8.1L8 2.4C7.8 1.7 7.3 1.5 6.6 1.5H7.5Z" fill="#F7B600" />
              </svg>
            </div>
            {/* Mastercard */}
            <div className="w-16 h-11 bg-white rounded-lg border border-gray-200 flex items-center justify-center p-2.5 shadow-sm hover:shadow-md transition-shadow">
              <svg viewBox="0 0 48 32" fill="none" className="w-[85%] h-auto max-w-full" preserveAspectRatio="xMidYMid meet">
                <circle cx="18" cy="16" r="10" fill="#EB001B" />
                <circle cx="30" cy="16" r="10" fill="#F79E1B" />
                <path d="M24 9.5C22 11.3 20.7 13.5 20.7 16C20.7 18.5 22 20.7 24 22.5C26 20.7 27.3 18.5 27.3 16C27.3 13.5 26 11.3 24 9.5Z" fill="#FF5F00" />
              </svg>
            </div>
            {/* American Express */}
            <div className="w-16 h-11 bg-[#006FCF] rounded-lg border border-gray-200 flex items-center justify-center p-2.5 shadow-sm hover:shadow-md transition-shadow">
              <svg viewBox="0 0 48 16" fill="none" className="w-[85%] h-auto max-w-full" preserveAspectRatio="xMidYMid meet">
                <path d="M5.5 11L6.5 8.5H4.5L5.5 11ZM7.2 13H8.8L6 6H4.2L1.4 13H3L3.7 11.2H7.3L7.2 13ZM14 6H10V13H11.5V10.5H13.5L15 13H16.8L15.1 10.3C15.9 9.9 16.5 9.1 16.5 8C16.5 6.9 15.7 6 14 6ZM13.8 9.2H11.5V7.3H13.8C14.4 7.3 14.9 7.7 14.9 8.2C14.9 8.8 14.4 9.2 13.8 9.2ZM20 6H17V13H20C22 13 23.5 11.7 23.5 9.5C23.5 7.3 22 6 20 6ZM20 11.7H18.5V7.3H20C21.2 7.3 22 8.2 22 9.5C22 10.8 21.2 11.7 20 11.7ZM28.5 11L29.5 8.5H27.5L28.5 11ZM30.2 13H31.8L29 6H27.2L24.4 13H26L26.7 11.2H30.3L30.2 13ZM37 6H33V13H34.5V10.5H36.5L38 13H39.8L38.1 10.3C38.9 9.9 39.5 9.1 39.5 8C39.5 6.9 38.7 6 37 6ZM36.8 9.2H34.5V7.3H36.8C37.4 7.3 37.9 7.7 37.9 8.2C37.9 8.8 37.4 9.2 36.8 9.2ZM43 6H41V13H46V11.7H43V6Z" fill="white" />
              </svg>
            </div>
            {/* PayPal */}
            <div className="w-16 h-11 bg-white rounded-lg border border-gray-200 flex items-center justify-center p-2.5 shadow-sm hover:shadow-md transition-shadow">
              <svg viewBox="2 0 44 16" fill="none" className="w-[85%] h-auto max-w-full" preserveAspectRatio="xMidYMid meet">
                <path d="M18.5 2C18.5 1.4 18 1 17.4 1H12.5L9.5 14H12L13 9.5H15.5C18.5 9.5 20.5 7.8 20.5 5C20.5 3.2 19.7 2 18.5 2ZM15.8 7.2H14L14.8 3.3H16.2C17.2 3.3 17.8 3.8 17.8 4.7C17.8 6 16.9 7.2 15.8 7.2Z" fill="#003087" />
                <path d="M27.5 6C25.5 6 24 7.3 24 9.2C24 10.8 25.2 12 26.8 12C28.8 12 30.3 10.7 30.3 8.8C30.3 7.2 29.1 6 27.5 6ZM27.3 10.5C26.6 10.5 26.2 10 26.2 9.3C26.2 8.3 26.8 7.5 27.7 7.5C28.4 7.5 28.8 8 28.8 8.7C28.8 9.7 28.2 10.5 27.3 10.5Z" fill="#003087" />
                <path d="M35.5 6.2L35.3 7.5C35 6.8 34.2 6.2 33.2 6.2C31.5 6.2 30 7.8 30 9.8C30 11.2 30.9 12.2 32.2 12.2C33.2 12.2 33.9 11.7 34.2 11.2L34.1 12H36L37.5 6.2H35.5ZM33.8 10.5C33.1 10.5 32.7 10 32.7 9.3C32.7 8.4 33.3 7.7 34.1 7.7C34.8 7.7 35.2 8.2 35.2 8.9C35.2 9.8 34.6 10.5 33.8 10.5Z" fill="#009CDE" />
                <path d="M41.5 2C41.5 1.4 41 1 40.4 1H35.5L32.5 14H35L36 9.5H38.5C41.5 9.5 43.5 7.8 43.5 5C43.5 3.2 42.7 2 41.5 2ZM38.8 7.2H37L37.8 3.3H39.2C40.2 3.3 40.8 3.8 40.8 4.7C40.8 6 39.9 7.2 38.8 7.2Z" fill="#009CDE" />
              </svg>
            </div>
            {/* Google Pay */}
            <div className="w-16 h-11 bg-white rounded-lg border border-gray-200 flex items-center justify-center p-2.5 shadow-sm hover:shadow-md transition-shadow">
              <svg viewBox="0 0 48 20" fill="none" className="w-[85%] h-auto max-w-full" preserveAspectRatio="xMidYMid meet">
                <path d="M22.5 9.5V14H20.8V1H26C27.3 1 28.5 1.5 29.4 2.4C30.3 3.3 30.8 4.5 30.8 5.8C30.8 7.1 30.3 8.3 29.4 9.2C28.5 10.1 27.3 10.6 26 10.6H22.5V9.5ZM22.5 2.7V8.8H26C26.9 8.8 27.7 8.5 28.3 7.9C28.9 7.3 29.2 6.5 29.2 5.6C29.2 4.7 28.9 3.9 28.3 3.3C27.7 2.7 26.9 2.4 26 2.4H22.5V2.7Z" fill="#5F6368" />
                <path d="M35.5 6C36.5 6 37.4 6.4 38 7.1V6.2H39.7V14H38V13.1C37.4 13.8 36.5 14.2 35.5 14.2C34.3 14.2 33.2 13.7 32.4 12.9C31.6 12.1 31.1 11 31.1 9.9C31.1 8.8 31.6 7.7 32.4 6.9C33.2 6.1 34.3 5.6 35.5 5.6V6ZM32.8 9.9C32.8 10.7 33.1 11.4 33.6 11.9C34.1 12.4 34.8 12.7 35.6 12.7C36.4 12.7 37.1 12.4 37.6 11.9C38.1 11.4 38.4 10.7 38.4 9.9C38.4 9.1 38.1 8.4 37.6 7.9C37.1 7.4 36.4 7.1 35.6 7.1C34.8 7.1 34.1 7.4 33.6 7.9C33.1 8.4 32.8 9.1 32.8 9.9Z" fill="#5F6368" />
                <path d="M48 6.2L43.5 16.5C42.9 17.9 41.8 18.6 40.5 18.6C39.7 18.6 39 18.4 38.3 17.9L39 16.5C39.5 16.8 40 17 40.5 17C41.2 17 41.7 16.6 42 15.9L42.3 15.2L38.2 6.2H40L43.2 13.5L46.4 6.2H48Z" fill="#5F6368" />
                <path d="M15.5 8.5C15.5 8.2 15.5 7.9 15.4 7.6H8V9.3H12.2C12.1 10 11.7 10.6 11.1 11V12.3H13.4C14.7 11.1 15.5 9.4 15.5 8.5Z" fill="#4285F4" />
                <path d="M8 14C9.6 14 11 13.5 12 12.7L9.7 11.4C9.1 11.8 8.3 12 7.5 12C6 12 4.7 10.8 4.2 9.3H1.8V10.7C2.8 12.7 5.2 14 8 14Z" fill="#34A853" />
                <path d="M4.2 9.3C4 8.9 3.9 8.5 3.9 8C3.9 7.5 4 7.1 4.2 6.7V5.3H1.8C1.3 6.3 1 7.1 1 8C1 8.9 1.3 9.7 1.8 10.7L4.2 9.3Z" fill="#FBBC05" />
                <path d="M8 4C8.9 4 9.7 4.3 10.3 4.9L12.4 2.8C11 1.5 9.1 0.7 8 0.7C5.2 0.7 2.8 2 1.8 4L4.2 5.4C4.7 3.9 6 2.7 8 2.7V4Z" fill="#EA4335" />
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
            className={`group font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 inline-flex items-center gap-3 ${uploadedFile
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 hover-glow cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
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
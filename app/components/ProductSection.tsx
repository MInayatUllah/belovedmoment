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
    <section id="Product" className="py-20 relative overflow-hidden" >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50"></div>
      <div className="absolute inset-0" style={{backgroundColor: "#fff"}}></div>

      <div className="relative z-10 container mx-auto px-4 max-w-5xl">

        {/* 1. Video Section */}
        {/* <div className="mb-12 text-center">
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
        </div> */}

        {/* 2. Heading and Para */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6 leading-tight">
            Transform Your Photos Into Living Memories
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto px-4 leading-relaxed">
            We'll turn your picture into 8 - 11 seconds of video clip, delivered when you choose as per plan.
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
            <span className="font-bold">4.8</span> (126 reviews)
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
                    {/* <p className={`text-sm`}>Express</p> */}
                    <div className="hidden sm:block text-[10px] text-gray-400 mt-1">Delivery tomorrow</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        


        {/* Payment Cards images*/}

        <img src="/cards/mastercard-visa-apple-pay-google-pay-popular-payment-systems-finance-system-app-bank-card-illustration-free-vector.jpg" alt=""  style={{height: '30px', margin:'auto', marginBottom:"40px"}} />



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
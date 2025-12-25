'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function HeroSection() {
  
  const videos = [
    '/gifs/1.gif',
    '/gifs/2.gif',
    '/gifs/3.gif'
  ];

  return (
    <section 
      className="min-h-screen bg-cover bg-center relative -mt-20 pt-10 overflow-hidden"
      style={{ backgroundImage: 'url(/3672201.jpg)' }}
      id="Featured"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-purple-900/30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.1),transparent_70%)]"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-start gap-12 min-h-[80vh]">
          
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-6 mb-8 fade-in-up">
              <Image src="/leaves-left.svg" alt="" width={24} height={24} className='invert scale-x-[-1] float'/>
              <div className="-mx-1 flex flex-col items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-2 rounded-full">
                <span className="text-xs font-bold md:text-sm text-black">Product of the day</span>
                <span className="text-lg font-bold md:text-xl text-black">No. 1</span>
              </div>
              <Image src="/leaves-right.svg" alt="" width={24} height={24} className='invert float'/>
            </div>
            
            <h1 className="fade-in-up relative max-w-[800px] text-balance text-center text-4xl font-light tracking-tight text-slate-300 md:text-left lg:text-6xl lg:leading-[1.1] [&_b]:font-black [&_b]:bg-gradient-to-r [&_b]:from-white [&_b]:to-purple-200 [&_b]:bg-clip-text [&_b]:text-transparent" style={{animationDelay: '0.2s'}}>
              Transform your <b>Beloved Moments</b> into <b>Living Memories</b>
            </h1>
            
            <p className="text-xl text-slate-200 mt-8 max-w-[600px] text-center lg:text-left leading-relaxed fade-in-up" style={{animationDelay: '0.4s'}}>
              Upload your favorite photos and receive a beautifully crafted video filled with emotion.
            </p>
            
            <div className="flex items-center justify-center lg:justify-start gap-6 mt-12 fade-in-up" style={{animationDelay: '0.6s'}}>
              <div className="flex hover-lift">
                {[1,2,3,4,5].map((i) => (
                  <img 
                    key={i}
                    src={`/reviews/${i}.png`}
                    className="-ml-[30px] first:ml-0 size-[56px] rounded-full border-[3px] border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110"
                    alt={`Customer ${i}`}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                  {[1,2,3,4,5].map((i) => (
                    <span key={i} className="text-yellow-400 text-2xl hover:scale-125 transition-transform cursor-pointer">★</span>
                  ))}
                </div>
                <span className="text-base text-slate-300">
                  <b className="text-white text-lg">4.8/5</b> • 1,249 reviews
                </span>
              </div>
            </div>
            
            {/* Enhanced CTA Button */}
            <div className="flex justify-center lg:justify-start mt-10 fade-in-up" style={{animationDelay: '0.8s'}}>
              <a 
                href="#Order"
                className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 inline-flex items-center gap-3 hover-glow"
              >
                <span>Order now</span>
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Video Slider */}
          <div className="w-full lg:w-1/2 flex justify-center fade-in" style={{animationDelay: '0.4s'}}>
            <div className="relative w-full max-w-md lg:max-w-lg">
              <Swiper
                modules={[Autoplay]}
                autoplay={{
                  delay: 4000,
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
                      className="w-full object-contain max-h-[750px]"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const videos = [
    '/gifs/Header 1.gif',
    '/gifs/Header 2.gif',
    '/gifs/Header 3.gif'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % videos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [videos.length]);

  return (
    <section 
      className="min-h-screen bg-cover bg-center relative -mt-20 pt-10"
      style={{ backgroundImage: 'url(/3672201.jpg)' }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 min-h-[80vh]">
          
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-6 mb-6">
              <Image src="/leaves-left.svg" alt="" width={20} height={20} className='invert scale-x-[-1]'/>
              <div data-v-4d0f5c97="" className="-mx-1 flex flex-col items-center gap-1 [&amp;_span]:leading-none"><span data-v-4d0f5c97="" className="text-xs font-[600] md:text-sm text-white">Product of the day</span><span data-v-4d0f5c97="" className="text-lg font-[600] md:text-2xl text-white">No. 1</span></div>

              <Image src="/leaves-right.svg" alt="" width={20} height={20} className='invert'/>
            </div>
            
            <h1 className="fade-up relative max-w-[800px] text-balance text-center !text-4xl !font-[300] tracking-tighter !text-slate-400 md:text-left lg:!text-[60px] lg:!leading-[60px] [&_b]:font-[800] [&_b]:!text-slate-50">
              Transform Your Beloved Moments Into <b>Living Memories</b>
            </h1>
            
            <p className="text-lg text-slate-300 mt-6 max-w-[600px] text-center lg:text-left">
              Upload your favourite photos and receive a beautifully crafted video filled with emotion, meaning, and music.
            </p>
            
            <div className="mt-8 text-center lg:text-left">
              <p className="text-xl text-slate-200 italic">
                Where photos turn into stories, and stories turn into feelings.
              </p>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start gap-4 mt-10">
              <div className="flex">
                {[1,2,3,4,5].map((i) => (
                  <img 
                    key={i}
                    src={`https://general.cdn.giannabellucci.com/cgp/brand/momento/reviews/Untitled-${i}.jpg?width=100`}
                    className="-ml-[30px] first:ml-0 size-[52px] rounded-full border-[4px] border-slate-950"
                    alt=""
                  />
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex">
                  {[1,2,3,4,5].map((i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <span className="text-sm text-slate-400">
                  <b className="text-white">4.8/5</b>&nbsp;&nbsp;&nbsp;1249 reviews
                </span>
              </div>
            </div>
          </div>

          {/* Column 2 - Video Slider */}
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <div 
                className="flex transition-transform duration-1000 ease-in-out" 
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {videos.map((video, index) => (
                  <img
                    key={index}
                    src={video}
                    alt=""
                    className="w-full h-full object-cover flex-shrink-0"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
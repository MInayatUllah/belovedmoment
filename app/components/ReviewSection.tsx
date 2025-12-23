'use client';

import { useState } from 'react';

export default function ReviewSection() {
  const [showMore, setShowMore] = useState(false);

  const videos = [
    '/gifs/review1.gif',
    '/gifs/review2.gif',
    '/gifs/review3.gif',
    '/gifs/review4.gif',
    '/gifs/review5.gif',
    '/gifs/review6.gif',
    '/gifs/review7.gif',
    '/gifs/review8.gif',
    '/gifs/review9.gif',
    '/gifs/review9.gif'
  ];

  const reviews = [
    { name: 'Margaret & Harold T.', location: 'USA', review: 'Seeing our old wedding photo come to life after 50 years of marriage was magical. Our grandchildren were amazed!', rating: 5, image: '/reviews/2.png' },
    { name: 'Eleanor & Frank R.', location: 'UK', review: 'This brought back so many memories of our younger days. The gentle movement made our vintage photo feel alive again.', rating: 5, image: '/reviews/1.png' },
    { name: 'Sarah & Michael J.', location: 'Spain', review: 'Perfect anniversary gift! Our engagement photo now moves so naturally. We watch it every day together.', rating: 4, image: '/reviews/3.png' },
    { name: 'Emma & David M.', location: 'Canada', review: 'Our first photo with our newborn baby is now a living memory. The gentle breathing effect is so realistic and touching.', rating: 5, image: '/reviews/4.png' },
    { name: 'Lisa & James K.', location: 'Australia', review: 'Family photo with our two kids came alive beautifully. The children love seeing themselves move in the picture!', rating: 5, image: '/reviews/5.png' },
    { name: 'Maria & Sofia L.', location: 'Germany', review: 'Mother-daughter moment preserved forever. The subtle movements make this photo so much more meaningful to us.', rating: 4, image: '/reviews/6.png' },
    { name: 'Veterans Association', location: 'France', review: 'Our old military unit photo from the 1940s now shows our brotherhood in motion. Incredible tribute to our fallen comrades.', rating: 5, image: '/reviews/7.png' },
    { name: 'Roberto & Family', location: 'Italy', review: 'Three generations in one photo - me, my pregnant wife, and my mother. The gentle movements capture our joy perfectly.', rating: 5, image: '/reviews/8.png' },
    { name: 'Jennifer & Baby Lucas', location: 'Netherlands', review: 'Our first moments together in the hospital are now a living memory. The peaceful breathing effect is so beautiful.', rating: 4, image: '/reviews/9.png' }
  ];

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const totalCards = isMobile ? 6 : 9;
  const initialCards = isMobile ? 3 : 6;
  const displayedReviews = showMore ? reviews.slice(0, totalCards) : reviews.slice(0, initialCards);

  return (
    <section className="py-20" style={{ backgroundColor: 'lab(23 28.14 -32.02)' }} id="reviews">
      <div className="container mx-auto px-4">
        
        {/* Part 1 - Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Hear From Our Happy Customers
          </h2>
          <p className="text-xl text-white/90 mb-4">
            Where photos turn into stories, and stories turn into feelings.
          </p>
          <p className="text-white/80 max-w-3xl mx-auto">
            Join thousands of families who have brought their precious memories to life with our expert editing team, creating magical moments that reconnect you with your loved ones.
          </p>
          
        </div>

        {/* Part 2 - Review Cards */}
        <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 md:gap-6 md:px-0 lg:grid-cols-3">
          {displayedReviews.map((review, index) => (
            <div 
              key={index} 
              className="flex h-fit flex-col items-start gap-4 rounded-2xl border border-white/15 bg-slate-900/30 p-6 backdrop-blur-xl cursor-pointer hover:bg-slate-900/40 transition-colors"
              onClick={() => {
                const orderSection = document.getElementById('Order');
                if (orderSection) {
                  orderSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              
              {/* Video */}
              <div className="pointer-events-none relative w-full">
                <div className="h-fit max-w-[450px]">
                  <div className="relative h-fit overflow-hidden rounded-[14px]">
                    <img 
                      src={videos[index % videos.length]} 
                      alt=""
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Profile */}
              <div className="flex items-center gap-2">
                <img 
                  className="flex-center size-[45px] flex-shrink-0 rounded-full bg-blue-600/20" 
                  src={review.image} 
                  alt="" 
                />
                <div>
                  <p className="font-semibold text-white opacity-80">{review.name}</p>
                  <div className="text-xs text-white opacity-50">{review.location}</div>
                </div>
              </div>

              {/* Review Text */}
              <div className="flex-grow">
                <p className="text-sm text-white opacity-80 md:text-base/7">
                  {review.review}
                </p>
              </div>

              {/* Rating */}
              <div className="mt-auto flex items-center gap-2">
                <div className="flex">
                  {[1,2,3,4,5].map((star) => (
                    <span key={star} className={`text-xl ${star <= review.rating ? 'text-yellow-400' : 'text-gray-400'}`}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-white opacity-80">{review.rating}/5</span>
              </div>
            </div>
          ))}
        </div>

        {/* Part 3 - Load More/Show Less Button */}
        <div className="text-center mt-12">
          <button 
            onClick={() => setShowMore(!showMore)}
            className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 inline-flex items-center gap-3 hover-glow cursor-pointer"
          >
            <span>{showMore ? 'Show Less' : 'Load More Stories'}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showMore ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
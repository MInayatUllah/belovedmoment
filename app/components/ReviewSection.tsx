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
    { name: 'Marcus T.', location: 'USA', review: 'Seeing my grandfather move again brought tears to my eyes. The team did an amazing job bringing our old photo to life.', rating: 5, image: '/reviews/1.png' },
    { name: 'Isabella R.', location: 'UK', review: 'Really impressed with how natural the movement looks. My family loved watching our old wedding photo come alive.', rating: 5, image: '/reviews/2.png' },
    { name: 'Alexander J.', location: 'Spain', review: 'Perfect gift for my mom. She cried happy tears seeing her parents move again. Worth every penny.', rating: 4, image: '/reviews/3.png' },
    { name: 'Sophia M.', location: 'Canada', review: 'The editors really know what they\'re doing. My old family photo looks so realistic now. Highly recommend!', rating: 5, image: '/reviews/4.png' },
    { name: 'Benjamin K.', location: 'Australia', review: 'Lost my dad last year. This service let me see him smile one more time. Thank you so much.', rating: 5, image: '/reviews/5.png' },
    { name: 'Christopher L.', location: 'Germany', review: 'Fast delivery and great quality. The whole family was amazed at how good it turned out.', rating: 4, image: '/reviews/6.png' },
    { name: 'Victoria S.', location: 'France', review: 'Turned my wedding photo into something magical. Easy to order and the results are beautiful.', rating: 5, image: '/reviews/7.png' },
    { name: 'Anastasia P.', location: 'Italy', review: 'The movement looks so smooth and natural. Great way to preserve family memories for future generations.', rating: 5, image: '/reviews/8.png' },
    { name: 'Gabriella W.', location: 'Netherlands', review: 'Simple process and fantastic results. My kids love watching their grandparents come to life in the photo.', rating: 4, image: '/reviews/9.png' }
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
            className="bg-white text-black px-8 py-3 rounded-[50px] font-semibold hover:bg-gray-100 transition-colors cursor-pointer inline-flex items-center gap-3 text-lg"
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
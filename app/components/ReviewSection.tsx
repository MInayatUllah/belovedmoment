'use client';

import { useState } from 'react';

export default function ReviewSection() {
  const [showMore, setShowMore] = useState(false);

  const videos = [
    '/gifs/Beloved Moment (1).gif',
    '/gifs/Beloved Moment 3 (2).gif',
    '/gifs/Beloved Moment 3 (4).gif',
    '/gifs/Beloved Moment.gif'
  ];

  const reviews = [
    { name: 'Sarah M.', location: 'USA', review: 'Seeing my grandmother\'s wedding photo come to life brought tears to my eyes. It\'s like stepping back in time.', rating: 5, image: 'https://general.cdn.giannabellucci.com/cgp/brand/momento/reviews/Untitled-1.jpg' },
    { name: 'John D.', location: 'UK', review: 'Amazing technology! The video quality is incredible and the movement looks so natural.', rating: 5, image: 'https://general.cdn.giannabellucci.com/cgp/brand/momento/reviews/Untitled-2.jpg' },
    { name: 'Maria L.', location: 'Spain', review: 'Perfect way to preserve family memories. My kids love watching their great-grandparents come alive.', rating: 4, image: 'https://general.cdn.giannabellucci.com/cgp/brand/momento/reviews/Untitled-3.jpg' },
    { name: 'David K.', location: 'Canada', review: 'The AI is incredibly realistic. Worth every penny for bringing old photos to life.', rating: 5, image: 'https://general.cdn.giannabellucci.com/cgp/brand/momento/reviews/Untitled-4.jpg' },
    { name: 'Emma R.', location: 'Australia', review: 'Emotional experience seeing my late father move again. Technology at its finest.', rating: 5, image: 'https://general.cdn.giannabellucci.com/cgp/brand/momento/reviews/Untitled-5.jpg' },
    { name: 'Alex P.', location: 'Germany', review: 'Quick delivery and amazing results. The whole family was amazed by the quality.', rating: 4, image: 'https://general.cdn.giannabellucci.com/cgp/brand/momento/reviews/Untitled-6.jpg' },
    { name: 'Lisa T.', location: 'France', review: 'Brought my wedding photo to life beautifully. Such a magical experience!', rating: 5, image: 'https://general.cdn.giannabellucci.com/cgp/brand/momento/reviews/Untitled-7.jpg' },
    { name: 'Mike S.', location: 'Italy', review: 'Professional quality results. The movement is so smooth and natural looking.', rating: 5, image: 'https://general.cdn.giannabellucci.com/cgp/brand/momento/reviews/Untitled-8.jpg' },
    { name: 'Anna B.', location: 'Netherlands', review: 'Easy to use and fantastic results. Highly recommend for anyone wanting to preserve memories.', rating: 4, image: 'https://general.cdn.giannabellucci.com/cgp/brand/momento/reviews/Untitled-1.jpg' },
    { name: 'Tom W.', location: 'Sweden', review: 'The technology behind this is incredible. My old family photos look amazing as videos.', rating: 5, image: 'https://general.cdn.giannabellucci.com/cgp/brand/momento/reviews/Untitled-2.jpg' },
    { name: 'Sophie C.', location: 'Norway', review: 'Beautiful way to honor family history. The quality exceeded my expectations.', rating: 5, image: 'https://general.cdn.giannabellucci.com/cgp/brand/momento/reviews/Untitled-3.jpg' },
    { name: 'James H.', location: 'Denmark', review: 'Fast processing and incredible results. Will definitely use again for more photos.', rating: 4, image: 'https://general.cdn.giannabellucci.com/cgp/brand/momento/reviews/Untitled-4.jpg' },
    { name: 'Rachel G.', location: 'Belgium', review: 'Emotional and beautiful. Seeing my grandparents move again was priceless.', rating: 5, image: 'https://general.cdn.giannabellucci.com/cgp/brand/momento/reviews/Untitled-5.jpg' },
    { name: 'Chris M.', location: 'Austria', review: 'Top-notch quality and service. The AI animation is remarkably lifelike.', rating: 5, image: 'https://general.cdn.giannabellucci.com/cgp/brand/momento/reviews/Untitled-6.jpg' },
    { name: 'Nina F.', location: 'Switzerland', review: 'Perfect for preserving precious moments. The technology is truly impressive.', rating: 4, image: 'https://general.cdn.giannabellucci.com/cgp/brand/momento/reviews/Untitled-7.jpg' },
    { name: 'Paul J.', location: 'Ireland', review: 'Amazing experience from start to finish. The final video quality is outstanding.', rating: 5, image: 'https://general.cdn.giannabellucci.com/cgp/brand/momento/reviews/Untitled-8.jpg' }
  ];

  const displayedReviews = showMore ? reviews : reviews.slice(0, typeof window !== 'undefined' && window.innerWidth < 768 ? 6 : 9);

  return (
    <section className="py-20" style={{ backgroundColor: '#1D4ED8' }}>
      <div className="container mx-auto px-4">
        
        {/* Part 1 - Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Real Stories, Real Magic
          </h2>
          <p className="text-xl text-white/90 mb-4">
            See How People Are Bringing Their Memories to Life
          </p>
          <p className="text-white/80 max-w-3xl mx-auto">
            Join thousands of people who have experienced the joy of seeing their cherished photos come alive with natural, lifelike movement.
          </p>
        </div>

        {/* Part 2 - Review Cards */}
        <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 md:gap-6 md:px-0 lg:grid-cols-3">
          {displayedReviews.map((review, index) => (
            <div key={index} className="flex h-fit flex-col items-start gap-4 rounded-2xl border border-white/15 bg-slate-900/30 p-6 backdrop-blur-xl">
              
              {/* Video */}
              <div className="pointer-events-none relative w-full">
                <div className="h-fit max-w-[450px]">
                  <div className="relative h-fit overflow-hidden rounded-[14px]">
                    <img 
                      src={videos[index % videos.length]} 
                      alt=""
                      className="max-h-96 w-100 object-cover"
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
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
          >
            {showMore ? 'Show Less' : 'Load More'}
          </button>
        </div>
      </div>
    </section>
  );
}
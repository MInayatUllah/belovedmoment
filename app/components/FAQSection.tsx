'use client';

import { useState } from 'react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: Array<{question: string; answer: string}> = [
    {
      question: "Can I trust Beloved Moment with my photos and memories?",
      answer: "Yes, completely. At Beloved Moment, your photos and memories are treated with respect, care, and privacy. We use secure systems to process your uploads and never sell or share your content with third parties. Your moments belong to you always."
    },
    {
      question: "How long does it take to receive my video after placing an order?",
      answer: "Most videos are completed within 24 to 36 hours, depending on the options you select while ordering. During busy periods, it may take slightly longer — but you'll always be kept updated on the progress."
    },
    {
      question: "How should I prepare my photos before uploading them?",
      answer: "For the best results, we recommend: Using clear, high-quality images. Avoiding heavily blurred or pixelated photos. Choosing images with good lighting. No special editing is required — just send your favourite moments as they are."
    },
    {
      question: "Can I upload photos of printed pictures taken with my phone?",
      answer: "Yes, you can. If you're photographing printed images, simply try to: Avoid glare and shadows. Take the photo in good lighting. Keep the image straight and in focus. The clearer the photo, the better the final result."
    },
    {
      question: "I'm having trouble placing an order or uploading photos — can you help?",
      answer: "Feel free to ask! If you experience any issues during checkout or uploading, simply contact our support team. We'll walk you through the process and make sure your order is completed smoothly."
    },
    {
      question: "How will I know that my photos have been successfully submitted?",
      answer: "Once your upload is complete, you'll see a confirmation on screen, and you'll also receive a confirmation email after checkout."
    },
    {
      question: "Who owns the rights to the photos and videos I upload or receive?",
      answer: "You always retain full ownership of your photos and the final video we delivered. Beloved Moment does not claim any rights over your content. We simply use your images to create the video you requested."
    },
    {
      question: "Can I request that my photos and videos not be stored after delivery?",
      answer: "Yes. If you prefer your files not to be stored, simply contact us after receiving your video and request removal. We will permanently delete your content from our systems."
    },
    {
      question: "What if I'm not satisfied with my final video?",
      answer: "Your happiness matters to us. If something doesn't feel right, let us know. Depending on the situation, we will make reasonable adjustments or corrections to ensure you're satisfied with the final result."
    },
    {
      question: "Are there any platforms that offer a similar service?",
      answer: "While other services may be available, Beloved Moment focuses on creating a more emotional, personal, and carefully crafted experience, with dedicated support and attention to each memory you share."
    },
    {
      question: "How can I contact Beloved Moment if I need support or have questions?",
      answer: "You can reach us through our Contact Us page or by email. Our support team aims to reply within 24 hours and will be happy to assist you with anything you need."
    }
  ];

  const toggleFAQ = (index: number): void => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20" style={{ backgroundColor: 'lab(23 28.14 -32.02)' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Frequently asked questions
          </h2>
          <p className="text-xl text-white">
            Common Questions and Answers
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 max-w-6xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="flex h-fit flex-col items-start gap-4 rounded-2xl border border-white/15 bg-slate-900/30 p-6 backdrop-blur-xl cursor-pointer" onClick={() => toggleFAQ(index)}>
              
              {/* Question */}
              <div className="flex items-center justify-between w-full">
                <h3 className="text-base font-semibold text-white pr-2">
                  {faq.question}
                </h3>
                <svg 
                  className={`size-5 text-white transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M12 14.975q-.2 0-.375-.062T11.3 14.7l-4.6-4.6q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l3.9 3.9l3.9-3.9q.275-.275.7-.275t.7.275t.275.7t-.275.7l-4.6 4.6q-.15.15-.325.213t-.375.062"/>
                </svg>
              </div>
              
              {/* Answer */}
              <div className={`overflow-hidden transition-all duration-300 w-full ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}>
                <p className="text-sm text-white opacity-80">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Now Button */}
        <div className="text-center mt-12">
          <a 
            href="#Order"
            className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 inline-flex items-center gap-3 hover-glow cursor-pointer"
          >
            <span>Order Now</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
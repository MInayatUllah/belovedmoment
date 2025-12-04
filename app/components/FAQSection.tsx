'use client';

import { useState } from 'react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What kind of images work best?",
      answer: "High-quality portraits with clear facial features work best. Images should be at least 512x512 pixels for optimal results. We support JPG, PNG, and WEBP formats."
    },
    {
      question: "How long does it take to process?",
      answer: "Processing time depends on your selected option: 15 hours for premium service or 48 hours for standard service. You'll receive an email notification when your video is ready."
    },
    {
      question: "What video formats do you provide?",
      answer: "We provide MP4 videos in HD quality (1080p) that are compatible with all major platforms and devices. Videos are typically 6-10 seconds long."
    },
    {
      question: "Can I use the videos commercially?",
      answer: "Yes, you have full commercial rights to use the generated videos for your business, marketing, or any commercial purposes once you purchase our service."
    },
    {
      question: "What if I'm not satisfied with the result?",
      answer: "We offer a 30-day money-back guarantee. If you're not satisfied with the quality, contact our support team for a full refund or free revision."
    },
    {
      question: "Is my data secure and private?",
      answer: "Absolutely. We use enterprise-grade encryption and never share your images with third parties. All uploaded images are automatically deleted after 30 days."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 border-t border-slate-700" style={{ backgroundColor: 'rgb(3, 3, 3)' }}>
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Frequently asked questions
          </h2>
          <p className="text-xl text-white">
            Common Questions and Answers
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-700 backdrop-blur-xl">
              <div 
                className="flex cursor-pointer items-center justify-between p-4 md:p-6 md:py-4"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-base font-semibold text-white pr-4">
                  {faq.question}
                </span>
                <svg 
                  className={`size-5 text-white transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M12 14.975q-.2 0-.375-.062T11.3 14.7l-4.6-4.6q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l3.9 3.9l3.9-3.9q.275-.275.7-.275t.7.275t.275.7t-.275.7l-4.6 4.6q-.15.15-.325.213t-.375.062"/>
                </svg>
              </div>
              
              <div className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96 pb-4' : 'max-h-0'
              }`}>
                <div className="px-4 md:px-6" style={{ color: 'rgb(148, 163, 184)' }}>
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
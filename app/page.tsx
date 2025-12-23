import HeroSection from './components/HeroSection';
import ReviewSection from './components/ReviewSection';
import ProductSection from './components/ProductSection';
import HowItWorksSection from './components/HowItWorksSection';
import FAQSection from './components/FAQSection';

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "BelovedMoment",
    "description": "Professional photo to video transformation service that creates emotional videos from your beloved moments",
    "url": "https://belovedmoment.com",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "description": "Transform photos into living memories with professional editing",
      "seller": {
        "@type": "Organization",
        "name": "BelovedMoment"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1249",
      "bestRating": "5",
      "worstRating": "1"
    },
    "creator": {
      "@type": "Organization",
      "name": "BelovedMoment",
      "url": "https://belovedmoment.com"
    }
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HeroSection />
      <ReviewSection />
      <ProductSection />
      <HowItWorksSection />
      <FAQSection />
    </div>
  );
}

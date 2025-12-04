import HeroSection from './components/HeroSection';
import ReviewSection from './components/ReviewSection';
import ProductSection from './components/ProductSection';
import HowItWorksSection from './components/HowItWorksSection';
import FAQSection from './components/FAQSection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ReviewSection />
      <ProductSection />
      <HowItWorksSection />
      <FAQSection />
    </div>
  );
}

'use client';

import { Header } from './header';
import HeroSection from './landing/HeroSection';
import FeaturesSection from './landing/FeaturesSection';
import FAQSection from './landing/FAQSection';
import CTASection from './landing/CTASection';
import Footer from './landing/Footer';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Header className="fixed top-0 left-0 right-0 z-50 border-b-0" />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
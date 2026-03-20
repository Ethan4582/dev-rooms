'use client';

import HeroSection from './landing/HeroSection';
import FeaturesSection from './landing/FeaturesSection';
import CTASection from './landing/CTASection';
import Footer from './landing/Footer';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
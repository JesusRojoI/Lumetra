'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import PlansSection from '@/components/home/PlansSection';
import WhySection from '@/components/home/WhySection';
import ContactInfoSection from '@/components/home/ContactInfoSection';
import ContactFormSection from '@/components/home/ContactFormSection';
import ObjectivesSection from '@/components/home/ObjectivesSection';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <PlansSection />
        <WhySection />
        <ContactInfoSection />
        <ContactFormSection />
        <ObjectivesSection />
      </main>
      <Footer />
    </div>
  );
}
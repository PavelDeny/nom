////nomado\src\app\(public)\page.tsx
//// Не используем 'use client' — это Server Component

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import HeroSection from "@/components/sections/HeroSection"
import { LocationsSection } from "@/components/sections/LocationsSection"
import { FeaturesSection } from "@/components/sections/FeaturesSection"
import { GallerySection } from "@/components/sections/GallerySection"
import { ReviewsSection } from "@/components/sections/ReviewsSection"
import { PricingSection } from "@/components/sections/PricingSection"
import { ContactSection } from "@/components/sections/ContactSection"

export default function NomadoBreezePage() {
  return (
    <div className="min-h-screen bg-white ">
      <Header />

      <main>
        <HeroSection title={"Work Where the Breeze Takes You"} />
        <LocationsSection />
        <FeaturesSection />
      

        <GallerySection />

        <ReviewsSection />

        <PricingSection />

        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}
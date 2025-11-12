
import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { ServicesPreview } from '@/components/services-preview'
import { AboutSection } from '@/components/about-section'
import { ContactCTA } from '@/components/contact-cta'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ServicesPreview />
      <AboutSection />
      <ContactCTA />
      <Footer />
    </main>
  )
}

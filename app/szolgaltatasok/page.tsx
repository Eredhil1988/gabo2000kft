
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ServicesDetail } from '@/components/services-detail'

export const metadata = {
  title: 'Szolgáltatások - GABÓ 2000 Kft.',
  description: 'Fémszerkezet gyártás, hőkezelés és gép szállítás. Részletes szolgáltatás információk.'
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16">
        <ServicesDetail />
      </div>
      <Footer />
    </main>
  )
}

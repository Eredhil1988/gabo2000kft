
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ContactForm } from '@/components/contact-form'
import { ContactInfo } from '@/components/contact-info'

export const metadata = {
  title: 'Kapcsolat - GABÓ 2000 Kft.',
  description: 'Vegye fel a kapcsolatot a GABÓ 2000 Kft. csapatával. Ingyenes árajánlat kérés és szakértői tanácsadás.'
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16">
        <section className="py-20 bg-slate-950">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Kapcsolat
              </h1>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                Lépjen kapcsolatba velünk bizalommal! Tapasztalt csapatunk készen áll 
                projektjei megvalósítására és ingyenes árajánlat készítésére.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ContactForm />
              <ContactInfo />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}

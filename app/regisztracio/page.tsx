
import { SignupForm } from '@/components/signup-form'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Regisztráció - GABÓ 2000 Kft.',
  description: 'Regisztráljon a GABÓ 2000 Kft. ügyfélportáljára és kérjen árajánlatot.'
}

export default function SignupPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16 flex items-center justify-center min-h-screen bg-slate-950">
        <SignupForm />
      </div>
      <Footer />
    </main>
  )
}

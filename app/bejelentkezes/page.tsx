
import { LoginForm } from '@/components/login-form'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Bejelentkezés - GABÓ 2000 Kft.',
  description: 'Jelentkezzen be a GABÓ 2000 Kft. ügyfélportáljára.'
}

export default function LoginPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16 flex items-center justify-center min-h-screen bg-slate-950">
        <LoginForm />
      </div>
      <Footer />
    </main>
  )
}


import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth-options'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { DashboardContent } from '@/components/dashboard-content'

export const metadata = {
  title: 'Dashboard - GABÓ 2000 Kft.',
  description: 'Ügyfél dashboard - árajánlat kérések és projektek kezelése'
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/bejelentkezes')
  }

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16">
        <DashboardContent user={session?.user} />
      </div>
      <Footer />
    </main>
  )
}

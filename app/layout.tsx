
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SessionProvider } from '@/components/session-provider'

const inter = Inter({ subsets: ['latin'] })

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? 'http://localhost:3000'),
  title: 'GABÓ 2000 Kft. - Professzionális Ipari Szolgáltatások',
  description: 'GABÓ 2000 Kft. - Fémszerkezet gyártás, hőkezelés és gép szállítás. Professzionális ipari megoldások több mint 20 éves tapasztalattal.',
  icons: {
    icon: '/favicon.svg'
  },
  openGraph: {
    title: 'GABÓ 2000 Kft. - Professzionális Ipari Szolgáltatások',
    description: 'Fémszerkezet gyártás, hőkezelés és gép szállítás. Professzionális ipari megoldások.',
    images: ['/og-image.png'],
    type: 'website'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hu" className="dark">
      <body className={`${inter.className} min-h-screen bg-slate-950 text-slate-100 antialiased`}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}

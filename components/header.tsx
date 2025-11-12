
import Link from 'next/link'
import { Building2 } from 'lucide-react'
import dynamic from 'next/dynamic'

const HeaderClient = dynamic(() => import('./header-client').then(mod => mod.HeaderClient), {
  ssr: false,
  loading: () => (
    <div className="flex items-center space-x-4">
      <Link href="/bejelentkezes" className="text-slate-300 hover:text-blue-400 transition-colors text-sm">
        Bejelentkezés
      </Link>
      <Link href="/regisztracio" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
        Regisztráció
      </Link>
    </div>
  )
})

export function Header() {
  const navItems = [
    { href: '/', label: 'Kezdőlap' },
    { href: '/szolgaltatasok', label: 'Szolgáltatások' },
    { href: '/kapcsolat', label: 'Kapcsolat' }
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Building2 className="h-8 w-8 text-blue-500 group-hover:text-blue-400 transition-colors" />
            <span className="text-xl font-bold text-white group-hover:text-blue-100 transition-colors">
              GABÓ 2000 Kft.
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-slate-300 hover:text-blue-400 transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
            
            <HeaderClient />
          </nav>

          {/* Mobile version */}
          <div className="md:hidden">
            <HeaderClient mobile />
          </div>
        </div>
      </div>
    </header>
  )
}

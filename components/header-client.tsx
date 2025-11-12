
'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Menu, X, User, LogOut } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface HeaderClientProps {
  mobile?: boolean
}

export function HeaderClient({ mobile }: HeaderClientProps) {
  const { data: session } = useSession() || {}
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  const navItems = [
    { href: '/', label: 'Kezdőlap' },
    { href: '/szolgaltatasok', label: 'Szolgáltatások' },
    { href: '/kapcsolat', label: 'Kapcsolat' }
  ]

  if (mobile) {
    return (
      <>
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="text-slate-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-16 left-0 right-0 bg-slate-950/98 backdrop-blur-sm border-b border-slate-800 py-4"
            >
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block text-slate-300 hover:text-blue-400 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  
                  {session ? (
                    <div className="space-y-3 pt-4 border-t border-slate-800">
                      <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" className="w-full bg-slate-800 border-slate-700">
                          <User className="h-4 w-4 mr-2" />
                          Dashboard
                        </Button>
                      </Link>
                      <Button 
                        onClick={() => { handleSignOut(); setIsMenuOpen(false); }} 
                        variant="ghost" 
                        className="w-full text-red-400 hover:text-red-300"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Kijelentkezés
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3 pt-4 border-t border-slate-800">
                      <Link href="/bejelentkezes" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="ghost" className="w-full text-slate-300">
                          Bejelentkezés
                        </Button>
                      </Link>
                      <Link href="/regisztracio" onClick={() => setIsMenuOpen(false)}>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          Regisztráció
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </>
    )
  }

  // Desktop version
  return (
    <>
      {session ? (
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700 hover:bg-slate-700">
              <User className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          </Link>
          <Button onClick={handleSignOut} variant="ghost" size="sm" className="text-slate-400 hover:text-red-400">
            <LogOut className="h-4 w-4 mr-2" />
            Kijelentkezés
          </Button>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <Link href="/bejelentkezes">
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-blue-400">
              Bejelentkezés
            </Button>
          </Link>
          <Link href="/regisztracio">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              Regisztráció
            </Button>
          </Link>
        </div>
      )}
    </>
  )
}

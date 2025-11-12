
'use client'

import Link from 'next/link'
import { Building2, Phone, Mail, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold text-white">GABÓ 2000 Kft.</span>
            </Link>
            
            <p className="text-slate-400 leading-relaxed">
              Professzionális ipari szolgáltatások több mint 20 éves tapasztalattal. 
              Megbízható partnere az ipari projektek sikeres megvalósításában.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Gyors linkek</h3>
            <nav className="space-y-3">
              <Link href="/szolgaltatasok" className="block text-slate-400 hover:text-blue-400 transition-colors">
                Szolgáltatások
              </Link>
              <Link href="/kapcsolat" className="block text-slate-400 hover:text-blue-400 transition-colors">
                Kapcsolat
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Kapcsolat</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-slate-400">
                  <p>4028 Debrecen</p>
                  <p>Kassai út 129.</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <a href="tel:+36304191273" className="text-slate-400 hover:text-blue-400 transition-colors">
                  +36 30 419 1273
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <a href="mailto:iroda@gabo2000kft.hu" className="text-slate-400 hover:text-blue-400 transition-colors">
                  iroda@gabo2000kft.hu
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center">
          <p className="text-slate-500">
            © 2024 GABÓ 2000 Kft. Minden jog fenntartva.
          </p>
        </div>
      </div>
    </footer>
  )
}

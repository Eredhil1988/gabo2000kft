
'use client'

import { Card } from '@/components/ui/card'
import { Phone, Mail, MapPin, Clock, Building2 } from 'lucide-react'

const contactDetails = [
  {
    icon: MapPin,
    title: 'Címünk',
    details: ['4028 Debrecen', 'Kassai út 129.', 'Magyarország']
  },
  {
    icon: Phone,
    title: 'Telefon',
    details: ['+36 30 419 1273', '+36 30 531 6963 (Lakatos üzem)', '+36 30 407 2381 (Hőkezelés)']
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['iroda@gabo2000kft.hu', 'lakatos@gabo2000kft.hu', 'bogatisandor@gabo2000kft.hu']
  },
  {
    icon: Clock,
    title: 'Nyitvatartás',
    details: ['Hétfő - Péntek: 6:00 - 14:00', 'Szombat - Vasárnap: Zárva']
  }
]

const services = [
  'Fémszerkezet gyártás',
  'Hőkezelési szolgáltatások',
  'Gép szállítás'
]

export function ContactInfo() {
  return (
    <div className="space-y-8">
      {/* Contact Details */}
      <Card className="bg-slate-900 border-slate-800 p-8">
        <div className="flex items-center mb-6">
          <Building2 className="h-8 w-8 text-blue-400 mr-3" />
          <h2 className="text-2xl font-bold text-white">Elérhetőségeink</h2>
        </div>

        <div className="space-y-6">
          {contactDetails.map((item, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <item.icon className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                {item.details.map((detail, idx) => (
                  <p key={idx} className="text-slate-400">
                    {detail}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Services Quick List */}
      <Card className="bg-slate-900 border-slate-800 p-8">
        <h3 className="text-xl font-bold text-white mb-6">Szolgáltatásaink</h3>
        <ul className="space-y-3">
          {services.map((service, index) => (
            <li key={index} className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3" />
              <span className="text-slate-300">{service}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}

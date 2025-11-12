
'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Building2, Zap, Truck, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'

const services = [
  {
    icon: Building2,
    title: 'Fémszerkezet Gyártás',
    description: 'Precíz fémszerkezetek tervezése és gyártása a legmodernebb technológiával. Acél- és alumínium konstrukciók egyedi igények szerint.',
    features: ['Egyedi tervezés', 'Precíz kivitelezés', 'Minőség garancia']
  },
  {
    icon: Zap,
    title: 'Hőkezelés',
    description: 'Professzionális hőkezelési szolgáltatások minden féme típushoz. Edzés, lágyítás, normalizálás és felületi kezelések.',
    features: ['Modern berendezések', 'Szabványos folyamatok', 'Gyors átfutási idő']
  },
  {
    icon: Truck,
    title: 'Gép Szállítás',
    description: 'Nehéz ipari gépek biztonságos szállítása és telepítése speciális eszközökkel és szakértő csapattal.',
    features: ['Speciális eszközök', 'Biztonságos szállítás', 'Szakértő csapat']
  }
]

export function ServicesPreview() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section ref={ref} className="py-20 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Szolgáltatásaink
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Komplex ipari megoldások egy helyen. Tapasztalt csapatunk garantálja 
            a minőségi kivitelezést és a határidők betartását.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="h-full bg-slate-800 border-slate-700 hover:border-blue-500 transition-all duration-300 group">
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-blue-500/20 rounded-lg mr-4 group-hover:bg-blue-500/30 transition-colors">
                      <service.icon className="h-8 w-8 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      {service.title}
                    </h3>
                  </div>
                  
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-slate-300">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <Link href="/szolgaltatasok">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg group">
              További részletek
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

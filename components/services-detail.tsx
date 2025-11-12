
'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Building2, Zap, Truck, Check, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'

const services = [
  {
    icon: Building2,
    title: 'Fémszerkezet Gyártás',
    description: 'Egyedi fémszerkezetek tervezése és gyártása a legmodernebb technológiákkal. Acél- és alumínium konstrukciók minden méretben és komplexitásban.',
    details: [
      'Ipari csarnokok acélszerkezetei',
      'Lakóépületek szerkezeti elemei',
      'Hidak és speciális konstrukciók',
      'Egyedi megmunkált alkatrészek',
      'Hegesztési és korrózióvédelmi szolgáltatások'
    ],
    technologies: ['3D CAD tervezés', 'CNC megmunkálás', 'Automata hegesztés', 'Felületi kezelések'],
    image: '/api/placeholder/600/400'
  },
  {
    icon: Zap,
    title: 'Hőkezelési Szolgáltatások',
    description: 'Professzionális hőkezelési eljárások minden féme típushoz. Modern kemencékkel és precíz hőmérsékleti szabályozással.',
    details: [
      'Edzés és lágyítás',
      'Normalizálás és feszültségcsökkentés',
      'Felületi keményítés',
      'Korrózióállóság növelése',
      'Anyagvizsgálati szolgáltatások'
    ],
    technologies: ['Programozott kemencék', 'Hőmérsékleti monitorozás', 'Minőségbiztosítás', 'Anyagvizsgálat'],
    image: '/api/placeholder/600/400'
  },
  {
    icon: Truck,
    title: 'Gép Szállítás',
    description: 'Nehéz ipari gépek, berendezések biztonságos mozgatása és szállítása speciális eszközökkel és tapasztalt csapattal.',
    details: [
      'Nehézgépek szállítása',
      'Berendezések telepítése és szerelése',
      'Gyári költöztetések',
      'Speciális rakományok kezelése',
      'Professzionális ügyintézés'
    ],
    technologies: ['Speciális szállító járművek', 'Emelőberendezések', 'GPS nyomkövetés', 'Biztosítási fedezet'],
    image: '/api/placeholder/600/400'
  }
]

export function ServicesDetail() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Professzionális Szolgáltatásaink
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Több mint 20 éves tapasztalatunkkal átfogó ipari megoldásokat nyújtunk. 
            Minden projektben a minőség és a megbízhatóság a legfontosabb számunkra.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div ref={ref} className="space-y-20">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="bg-slate-900 border-slate-800 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Content */}
                  <div className="p-8 lg:p-12 order-2 lg:order-1">
                    <div className="flex items-center mb-6">
                      <div className="p-3 bg-blue-500/20 rounded-lg mr-4">
                        <service.icon className="h-8 w-8 text-blue-400" />
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-white">
                        {service.title}
                      </h2>
                    </div>

                    <p className="text-slate-400 mb-8 text-lg leading-relaxed">
                      {service.description}
                    </p>

                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-white mb-4">Szolgáltatásaink:</h3>
                      <ul className="space-y-3">
                        {service.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start">
                            <Check className="h-5 w-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                            <span className="text-slate-300">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-white mb-4">Technológiáink:</h3>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm border border-slate-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link href="/kapcsolat">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 group">
                        Árajánlat kérés
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>

                  {/* Image placeholder */}
                  <div className="order-1 lg:order-2 bg-slate-800 min-h-[300px] lg:min-h-[500px] flex items-center justify-center">
                    <div className="text-center">
                      <service.icon className="h-20 w-20 text-blue-400 mx-auto mb-4" />
                      <p className="text-slate-400 text-lg">{service.title}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-20 p-12 bg-slate-900 rounded-2xl border border-slate-800"
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            Készen áll a projektre?
          </h2>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Lépjen kapcsolatba velünk még ma, és kapjon személyre szabott árajánlatot!
          </p>
          <Link href="/kapcsolat">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
              Kapcsolatfelvétel
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

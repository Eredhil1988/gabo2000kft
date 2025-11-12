
'use client'

import { Card } from '@/components/ui/card'
import { Award, Users, Clock, Shield } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const highlights = [
  {
    icon: Award,
    title: 'Minőség',
    description: 'Folyamatos minőség ellenőrzés és szigorú gyártási szabványok minden projektben.'
  },
  {
    icon: Users,
    title: 'Tapasztalat',
    description: 'Több mint 20 éves ipari tapasztalat és több száz sikeres projekt.'
  },
  {
    icon: Clock,
    title: 'Megbízhatóság',
    description: 'Pontos határidők betartása és professzionális ügyfélszolgálati támogatás.'
  },
  {
    icon: Shield,
    title: 'Garancia',
    description: 'Minden munkánkra kiterjedő garancia és teljes körű szerviz szolgáltatás.'
  }
]

export function AboutSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section ref={ref} className="py-20 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Miért válasszon minket?
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            A GABÓ 2000 Kft. az ipari szolgáltatások terén megbízható partner. 
            Szakértelmünk és tapasztalatunk garantálja projektjei sikeres megvalósítását.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="h-full bg-slate-800 border-slate-700 hover:border-blue-500 transition-all duration-300 group text-center">
                <div className="p-8">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-blue-500/20 rounded-full group-hover:bg-blue-500/30 transition-colors">
                      <item.icon className="h-8 w-8 text-blue-400" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

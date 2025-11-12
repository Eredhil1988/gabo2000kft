
'use client'

import { Button } from '@/components/ui/button'
import { Phone, Mail, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'

export function ContactCTA() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section ref={ref} className="py-20 bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Készen áll a következő projektre?
          </h2>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Vegye fel velünk a kapcsolatot még ma, és kérjen ingyenes árajánlatot! 
            Szakértő csapatunk segít megvalósítani elképzeléseit.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/kapcsolat">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg group">
                <Mail className="mr-2 h-5 w-5" />
                Árajánlat kérés
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <a href="tel:+36304191273" className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
              <Phone className="mr-2 h-5 w-5" />
              <span className="text-lg font-medium">+36 30 419 1273</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

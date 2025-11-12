
'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Building2, Zap, Truck } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with parallax effect */}
      <div className="absolute inset-0 steel-gradient">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{
            duration: 20,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'reverse'
          }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='https://static.vecteezy.com/system/resources/previews/021/056/143/non_2x/seamless-square-pattern-the-blue-circle-dots-diagonally-left-and-right-white-background-free-vector.jpg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.1'%3E%3Ccircle cx='9' cy='9' r='1'/%3E%3Cpath d='m19 19 2-2v-2h-2v2l-2 2M29 29l2-2v-2h-2v2l-2 2M39 39l2-2v-2h-2v2l-2 2M49 49l2-2v-2h-2v2l-2 2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
            <span className="block">Professzionális</span>
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Ipari Szolgáltatások
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            A GABÓ 2000 Kft. több mint 20 éves tapasztalattal szolgálja ki ügyfeleit 
            fémszerkezet gyártás, hőkezelés és gép szállítás területen.
          </p>

          {/* Service icons row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-wrap justify-center items-center gap-8 py-8"
          >
            {[
              { icon: Building2, label: 'Fémszerkezet' },
              { icon: Zap, label: 'Hőkezelés' },
              { icon: Truck, label: 'Gép szállítás' }
            ].map((service, index) => (
              <motion.div
                key={service.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center space-x-3 bg-slate-800/50 backdrop-blur-sm rounded-lg px-4 py-3 border border-slate-700"
              >
                <service.icon className="h-6 w-6 text-blue-400" />
                <span className="text-slate-200 font-medium">{service.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/szolgaltatasok">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold group steel-border"
              >
                Szolgáltatásaink
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/kapcsolat">
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-6 text-lg font-semibold"
              >
                Kapcsolatfelvétel
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-slate-700"
          >
            {[
              { number: '20+', label: 'Év tapasztalat' },
              { number: '500+', label: 'Sikeres projekt' },
              { number: '3', label: 'Szolgáltatási terület' },
              { number: '100%', label: 'Ügyfél elégedettség' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

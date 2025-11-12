
'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceType: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response?.ok) {
        setSuccess(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          serviceType: '',
          message: ''
        })
      } else {
        throw new Error('Hiba történt az üzenet elküldésekor')
      }
    } catch (error) {
      setError('Hiba történt az üzenet elküldésekor. Kérjük, próbálja újra.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-20"
      >
        <CheckCircle className="h-16 w-16 text-green-400 mb-6" />
        <h3 className="text-2xl font-bold text-white mb-4">Üzenet elküldve!</h3>
        <p className="text-slate-400 text-center mb-8">
          Köszönjük megkeresését! Hamarosan felvesszük Önnel a kapcsolatot.
        </p>
        <Button onClick={() => setSuccess(false)} variant="outline">
          Új üzenet küldése
        </Button>
      </motion.div>
    )
  }

  return (
    <Card className="bg-slate-900 border-slate-800 p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Üzenet küldése</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-300">Név *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
              className="bg-slate-800 border-slate-700 text-white focus:border-blue-500"
              placeholder="Az Ön neve"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
              className="bg-slate-800 border-slate-700 text-white focus:border-blue-500"
              placeholder="email@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-slate-300">Telefon</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="bg-slate-800 border-slate-700 text-white focus:border-blue-500"
              placeholder="+36 1 234 5678"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company" className="text-slate-300">Cég neve</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              className="bg-slate-800 border-slate-700 text-white focus:border-blue-500"
              placeholder="Cég Kft."
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-slate-300">Szolgáltatás típusa</Label>
          <Select value={formData.serviceType} onValueChange={(value) => handleChange('serviceType', value)}>
            <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
              <SelectValue placeholder="Válasszon szolgáltatást" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="femszerkezet">Fémszerkezet gyártás</SelectItem>
              <SelectItem value="hokezeles">Hőkezelés</SelectItem>
              <SelectItem value="szallitas">Gép szállítás</SelectItem>
              <SelectItem value="egyeb">Egyéb</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-slate-300">Üzenet *</Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            required
            rows={5}
            className="bg-slate-800 border-slate-700 text-white focus:border-blue-500 resize-none"
            placeholder="Írja le projektjének részleteit, hogy személyre szabott árajánlatot készíthessünk..."
          />
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-red-400">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold group"
        >
          {isLoading ? (
            'Küldés...'
          ) : (
            <>
              <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              Üzenet küldése
            </>
          )}
        </Button>
      </form>
    </Card>
  )
}

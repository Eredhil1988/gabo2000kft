
'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FileText, Send, AlertCircle, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface QuoteRequestFormProps {
  onSuccess: () => void
}

export function QuoteRequestForm({ onSuccess }: QuoteRequestFormProps) {
  const [formData, setFormData] = useState({
    serviceType: '',
    description: '',
    contactInfo: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/quote-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response?.ok) {
        setSuccess(true)
        setTimeout(() => {
          onSuccess()
          setFormData({ serviceType: '', description: '', contactInfo: '' })
          setSuccess(false)
        }, 2000)
      } else {
        const data = await response?.json()
        setError(data?.message || 'Hiba történt az árajánlat kérés elküldésekor')
      }
    } catch (error) {
      setError('Hiba történt az árajánlat kérés elküldésekor')
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
        className="text-center py-12"
      >
        <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-white mb-4">Árajánlat kérés elküldve!</h3>
        <p className="text-slate-400">
          Hamarosan felvesszük Önnel a kapcsolatot a részletekkel.
        </p>
      </motion.div>
    )
  }

  return (
    <Card className="bg-slate-900 border-slate-800 p-8">
      <div className="flex items-center mb-6">
        <FileText className="h-8 w-8 text-blue-400 mr-3" />
        <h2 className="text-2xl font-bold text-white">Új árajánlat kérés</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label className="text-slate-300">Szolgáltatás típusa *</Label>
          <Select value={formData.serviceType} onValueChange={(value) => handleChange('serviceType', value)} required>
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
          <Label htmlFor="description" className="text-slate-300">Projekt leírása *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            required
            rows={6}
            className="bg-slate-800 border-slate-700 text-white focus:border-blue-500 resize-none"
            placeholder="Részletesen írja le projektjét: méretek, anyagok, határidők, speciális igények..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactInfo" className="text-slate-300">További kapcsolati információk</Label>
          <Textarea
            id="contactInfo"
            value={formData.contactInfo}
            onChange={(e) => handleChange('contactInfo', e.target.value)}
            rows={3}
            className="bg-slate-800 border-slate-700 text-white focus:border-blue-500 resize-none"
            placeholder="Telefonszám, cím, preferált kapcsolattartási idő, egyéb megjegyzések..."
          />
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-red-400 bg-red-400/10 p-3 rounded-lg">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex space-x-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold group"
          >
            {isLoading ? (
              'Küldés...'
            ) : (
              <>
                <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                Árajánlat kérés küldése
              </>
            )}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={onSuccess}
            className="px-8 py-6 text-lg border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            Mégse
          </Button>
        </div>
      </form>
    </Card>
  )
}

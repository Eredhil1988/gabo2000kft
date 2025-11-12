
'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UserPlus, AlertCircle, Building2, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('A jelszavak nem egyeznek')
      setIsLoading(false)
      return
    }

    try {
      // Register user
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      })

      if (response?.ok) {
        setSuccess(true)
        // Auto login after successful registration
        const result = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false
        })

        if (result?.ok) {
          router.replace('/dashboard')
        }
      } else {
        const data = await response?.json()
        setError(data?.message || 'Hiba történt a regisztráció során')
      }
    } catch (error) {
      setError('Hiba történt a regisztráció során')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md px-4"
      >
        <Card className="bg-slate-900 border-slate-800 p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">Sikeres regisztráció!</h2>
          <p className="text-slate-400 mb-6">
            Fiókja sikeresen létrejött. Átirányítjuk a dashboard-ra...
          </p>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-md px-4"
    >
      <Card className="bg-slate-900 border-slate-800 p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Building2 className="h-12 w-12 text-blue-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Regisztráció</h1>
          <p className="text-slate-400">Csatlakozzon a GABÓ 2000 Kft. ügyfélportáljához</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-300">Teljes név</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-slate-800 border-slate-700 text-white focus:border-blue-500"
              placeholder="Kovács János"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">Email cím</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-slate-800 border-slate-700 text-white focus:border-blue-500"
              placeholder="kovacs.janos@email.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-300">Jelszó</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="bg-slate-800 border-slate-700 text-white focus:border-blue-500"
              placeholder="••••••••"
            />
            <p className="text-sm text-slate-500">Minimum 6 karakter</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-slate-300">Jelszó megerősítése</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength={6}
              className="bg-slate-800 border-slate-700 text-white focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-red-400 bg-red-400/10 p-3 rounded-lg">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold"
          >
            {isLoading ? (
              'Regisztráció...'
            ) : (
              <>
                <UserPlus className="mr-2 h-5 w-5" />
                Regisztráció
              </>
            )}
          </Button>
        </form>

        <div className="text-center mt-8 pt-6 border-t border-slate-800">
          <p className="text-slate-400">
            Már van fiókja?{' '}
            <Link href="/bejelentkezes" className="text-blue-400 hover:text-blue-300 font-medium">
              Bejelentkezés
            </Link>
          </p>
        </div>
      </Card>
    </motion.div>
  )
}

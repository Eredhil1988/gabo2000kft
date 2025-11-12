
'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LogIn, AlertCircle, Building2 } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (result?.ok) {
        router.replace('/dashboard')
      } else {
        setError('Helytelen email cím vagy jelszó')
      }
    } catch (error) {
      setError('Hiba történt a bejelentkezés során')
    } finally {
      setIsLoading(false)
    }
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
          <h1 className="text-2xl font-bold text-white mb-2">Bejelentkezés</h1>
          <p className="text-slate-400">Jelentkezzen be a GABÓ 2000 Kft. ügyfélportáljára</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">Email cím</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-slate-800 border-slate-700 text-white focus:border-blue-500"
              placeholder="pelda@email.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-300">Jelszó</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
              'Bejelentkezés...'
            ) : (
              <>
                <LogIn className="mr-2 h-5 w-5" />
                Bejelentkezés
              </>
            )}
          </Button>
        </form>

        <div className="text-center mt-8 pt-6 border-t border-slate-800">
          <p className="text-slate-400">
            Még nincs fiókja?{' '}
            <Link href="/regisztracio" className="text-blue-400 hover:text-blue-300 font-medium">
              Regisztráció
            </Link>
          </p>
        </div>
      </Card>
    </motion.div>
  )
}

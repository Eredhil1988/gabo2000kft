
'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { QuoteRequestForm } from '@/components/quote-request-form'
import { User, FileText, Clock, CheckCircle, Plus, Calendar, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { hu } from 'date-fns/locale'

interface QuoteRequest {
  id: string
  serviceType: string
  description: string
  contactInfo: string
  status: string
  createdAt: string
}

interface DashboardContentProps {
  user?: {
    id?: string
    name?: string | null
    email?: string | null
  }
}

export function DashboardContent({ user }: DashboardContentProps) {
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([])
  const [showForm, setShowForm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchQuoteRequests()
  }, [])

  const fetchQuoteRequests = async () => {
    try {
      const response = await fetch('/api/quote-requests')
      if (response?.ok) {
        const data = await response.json()
        setQuoteRequests(data || [])
      }
    } catch (error) {
      console.error('Error fetching quote requests:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getServiceTypeName = (type: string) => {
    const types: { [key: string]: string } = {
      femszerkezet: 'Fémszerkezet gyártás',
      hokezeles: 'Hőkezelés',
      epitoipar: 'Építőipari szolgáltatások',
      szallitas: 'Gép szállítás',
      egyeb: 'Egyéb'
    }
    return types[type] || type
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Függőben', variant: 'secondary' as const },
      processing: { label: 'Feldolgozás alatt', variant: 'default' as const },
      completed: { label: 'Befejezve', variant: 'success' as const }
    }
    const config = statusConfig[status as keyof typeof statusConfig] || { label: status, variant: 'secondary' as const }
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const stats = {
    total: quoteRequests?.length || 0,
    pending: quoteRequests?.filter(req => req?.status === 'pending')?.length || 0,
    completed: quoteRequests?.filter(req => req?.status === 'completed')?.length || 0
  }

  return (
    <section className="py-12 bg-slate-950 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Üdvözöljük, {user?.name || 'Ügyfél'}!
              </h1>
              <p className="text-xl text-slate-400">
                Kezelheti árajánlat kéréseit és nyomon követheti projektjeit.
              </p>
            </div>
            
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg"
            >
              <Plus className="mr-2 h-5 w-5" />
              Új árajánlat kérés
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-slate-900 border-slate-800 p-6">
              <div className="flex items-center">
                <FileText className="h-10 w-10 text-blue-400 mr-4" />
                <div>
                  <p className="text-2xl font-bold text-white">{stats.total}</p>
                  <p className="text-slate-400">Összes kérés</p>
                </div>
              </div>
            </Card>

            <Card className="bg-slate-900 border-slate-800 p-6">
              <div className="flex items-center">
                <Clock className="h-10 w-10 text-yellow-400 mr-4" />
                <div>
                  <p className="text-2xl font-bold text-white">{stats.pending}</p>
                  <p className="text-slate-400">Függőben</p>
                </div>
              </div>
            </Card>

            <Card className="bg-slate-900 border-slate-800 p-6">
              <div className="flex items-center">
                <CheckCircle className="h-10 w-10 text-green-400 mr-4" />
                <div>
                  <p className="text-2xl font-bold text-white">{stats.completed}</p>
                  <p className="text-slate-400">Befejezett</p>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Quote Request Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-12"
          >
            <QuoteRequestForm onSuccess={() => {
              setShowForm(false)
              fetchQuoteRequests()
            }} />
          </motion.div>
        )}

        {/* Quote Requests List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-white mb-8">Árajánlat kéréseim</h2>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-slate-400 mt-4">Betöltés...</p>
            </div>
          ) : quoteRequests?.length === 0 ? (
            <Card className="bg-slate-900 border-slate-800 p-12 text-center">
              <FileText className="h-16 w-16 text-slate-600 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-white mb-4">
                Még nincs árajánlat kérése
              </h3>
              <p className="text-slate-400 mb-6">
                Kezdjen egy új árajánlat kérést, és csapatunk hamarosan felveszi Önnel a kapcsolatot.
              </p>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="mr-2 h-4 w-4" />
                Első árajánlat kérés
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {quoteRequests?.map((request, index) => (
                <motion.div
                  key={request?.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-slate-900 border-slate-800 p-8 hover:border-blue-500 transition-colors">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
                      <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                          <FileText className="h-6 w-6 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">
                            {getServiceTypeName(request?.serviceType)}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Calendar className="h-4 w-4 text-slate-500" />
                            <p className="text-slate-500 text-sm">
                              {request?.createdAt ? format(new Date(request.createdAt), 'yyyy. MMMM d.', { locale: hu }) : 'Ismeretlen dátum'}
                            </p>
                          </div>
                        </div>
                      </div>
                      {getStatusBadge(request?.status)}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-white font-medium mb-2">Projekt leírása:</h4>
                        <p className="text-slate-400 leading-relaxed">
                          {request?.description}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-white font-medium mb-2">Kapcsolati információk:</h4>
                        <p className="text-slate-400">
                          {request?.contactInfo}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

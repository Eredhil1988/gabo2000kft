
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, company, serviceType, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'A név, email és üzenet megadása kötelező' },
        { status: 400 }
      )
    }

    // Create or find a guest user
    let guestUser = await prisma.user.findUnique({
      where: { email: 'guest@gabo2000.hu' }
    })

    if (!guestUser) {
      guestUser = await prisma.user.create({
        data: {
          name: 'Guest User',
          email: 'guest@gabo2000.hu'
        }
      })
    }

    // Create contact info object
    const contactInfo = JSON.stringify({
      name,
      email,
      phone: phone || '',
      company: company || ''
    })

    // Save as a quote request
    await prisma.quoteRequest.create({
      data: {
        userId: guestUser.id,
        serviceType: serviceType || 'contact',
        description: message,
        contactInfo: contactInfo,
        status: 'pending'
      }
    })

    return NextResponse.json(
      { message: 'Üzenet sikeresen elküldve' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact error:', error)
    return NextResponse.json(
      { message: 'Szerver hiba történt' },
      { status: 500 }
    )
  }
}

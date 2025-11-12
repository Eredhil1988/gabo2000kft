
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/db'

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Nincs jogosultsága' },
        { status: 401 }
      )
    }

    const quoteRequests = await prisma.quoteRequest.findMany({
      where: {
        userId: session.user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(quoteRequests)
  } catch (error) {
    console.error('Get quote requests error:', error)
    return NextResponse.json(
      { message: 'Szerver hiba történt' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Nincs jogosultsága' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { serviceType, description, contactInfo } = body

    if (!serviceType || !description) {
      return NextResponse.json(
        { message: 'A szolgáltatás típusa és leírása kötelező' },
        { status: 400 }
      )
    }

    const quoteRequest = await prisma.quoteRequest.create({
      data: {
        userId: session.user.id,
        serviceType,
        description,
        contactInfo: contactInfo || '',
        status: 'pending'
      }
    })

    return NextResponse.json(
      { message: 'Árajánlat kérés sikeresen elküldve', quoteRequest },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create quote request error:', error)
    return NextResponse.json(
      { message: 'Szerver hiba történt' },
      { status: 500 }
    )
  }
}

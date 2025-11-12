
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create default test user (john@doe.com / johndoe123)
  const hashedPassword = await bcrypt.hash('johndoe123', 12)
  
  const testUser = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      name: 'John Doe',
      password: hashedPassword
    }
  })

  console.log('✅ Created test user:', testUser.email)

  // Create guest user for contact forms
  const guestUser = await prisma.user.upsert({
    where: { email: 'guest@gabo2000.hu' },
    update: {},
    create: {
      email: 'guest@gabo2000.hu',
      name: 'Guest User'
    }
  })

  console.log('✅ Created guest user:', guestUser.email)

  // Create sample quote requests for the test user
  const sampleQuoteRequests = [
    {
      userId: testUser.id,
      serviceType: 'femszerkezet',
      description: 'Ipari csarnok acélszerkezetének gyártása. Méret: 30x15 méter, 8 méter belmagasság. Szükséges elemek: főtartók, oszlopok, merevítő elemek. Kivitelezési határidő: 2024 március.',
      contactInfo: JSON.stringify({
        phone: '+36 20 123 4567',
        address: '1111 Budapest, Ipari út 5.',
        preferredTime: 'hétköznap 9-17 óra'
      }),
      status: 'pending'
    },
    {
      userId: testUser.id,
      serviceType: 'hokezeles',
      description: 'Acél alkatrészek hőkezelése. 50 db acél tengely edzése és megeresztése. Anyag: C45 acél, méret: ⌀50x300mm. Kívánt keménység: 45-50 HRC.',
      contactInfo: JSON.stringify({
        phone: '+36 20 123 4567',
        company: 'TestCorp Kft.',
        email: 'john@testcorp.hu'
      }),
      status: 'processing'
    },
    {
      userId: testUser.id,
      serviceType: 'epitoipar',
      description: 'Iroda épület felújítása és bővítése. Meglévő 200m² terület + 100m² új szárny építése. Tartalmazza: alapozás, falazás, tetőszerkezet, szigetelés.',
      contactInfo: JSON.stringify({
        phone: '+36 20 123 4567',
        address: '1234 Budapest, Kossuth utca 12.',
        deadline: '2024 június 30.'
      }),
      status: 'completed'
    }
  ]

  for (const request of sampleQuoteRequests) {
    const quoteRequest = await prisma.quoteRequest.create({
      data: request
    })
    console.log(`✅ Created quote request: ${request.serviceType}`)
  }

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

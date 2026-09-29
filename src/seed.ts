import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'

export async function seed(): Promise<void> {
  const payload = await getPayload({ config })
  payload.logger.info('🌸 Starting zozahrady mock data seeding...')

  // 1. Seed "Hlavná stránka" Page
  const existingPages = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home',
      },
    },
    limit: 1,
  })

  if (existingPages.totalDocs === 0) {
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Hlavná stránka',
        slug: 'home',
        _status: 'published',
      },
    })
    payload.logger.info('  ✓ Created page: Hlavná stránka (slug: home)')
  } else {
    payload.logger.info('  → Page "home" already exists, skipping')
  }

  // 2. Seed Bouquets
  const dummyBouquets = [
    {
      title: 'Lúčna nostalgia',
      description:
        'Voňavá kytica plná poľných a lúčnych kvetov, harmančeka, rebríčka a jemných tráv viazaná v prirodzenom vzdušnom štýle.',
      isAvailable: true,
      variants: [
        { size: 'Small' as const, priceEUR: 25, priceCZK: 620 },
        { size: 'Medium' as const, priceEUR: 38, priceCZK: 940 },
        { size: 'Large' as const, priceEUR: 55, priceCZK: 1360 },
      ],
    },
    {
      title: 'Slnečný vidiek',
      description:
        'Žiarivá kompozícia so slnečnicami, cíniami, nechtíkom a farebnými krasuľkami, ktorá do vášho domova prinesie hrejivé letné lúče.',
      isAvailable: true,
      variants: [
        { size: 'Small' as const, priceEUR: 28, priceCZK: 690 },
        { size: 'Medium' as const, priceEUR: 42, priceCZK: 1040 },
        { size: 'Large' as const, priceEUR: 60, priceCZK: 1480 },
      ],
    },
    {
      title: 'Romantická záhrada',
      description:
        'Elegantná kytica s pivonkami, anglickými ružami, černuškou a voňavým eukalyptom vhodná na slávnostné príležitosti a zásnuby.',
      isAvailable: true,
      variants: [
        { size: 'Small' as const, priceEUR: 32, priceCZK: 790 },
        { size: 'Medium' as const, priceEUR: 48, priceCZK: 1190 },
        { size: 'Large' as const, priceEUR: 68, priceCZK: 1680 },
      ],
    },
  ]

  for (const bouquet of dummyBouquets) {
    const existing = await payload.find({
      collection: 'bouquets',
      where: {
        title: {
          equals: bouquet.title,
        },
      },
      limit: 1,
    })

    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'bouquets',
        data: bouquet,
      })
      payload.logger.info(`  ✓ Created bouquet: ${bouquet.title}`)
    } else {
      payload.logger.info(`  → Bouquet "${bouquet.title}" already exists, skipping`)
    }
  }

  // 3. Seed Reviews (2 Approved, 1 Pending)
  const dummyReviews = [
    {
      customerName: 'Zuzana M.',
      rating: '5' as const,
      comment:
        'Kytica na svadbu bola jednoducho dychberúca! Všetci hostia sa pýtali, odkiaľ máme také nádherné čerstvé kvety. Ďakujeme z celého srdca za skvelý prístup.',
      status: 'Approved' as const,
    },
    {
      customerName: 'Michal K.',
      rating: '5' as const,
      comment:
        'Objednal som kyticu k narodeninám pre manželku. Kvety nádherne voňali po celej izbe a vydržali čerstvé vyše 10 dní. Veľká spokojnosť.',
      status: 'Approved' as const,
    },
    {
      customerName: 'Veronika P.',
      rating: '4' as const,
      comment:
        'Krásne sezónne kytice a veľmi oceňujem ekologické balenie v recyklovanom papieri bez zbytočných plastov.',
      status: 'Pending' as const,
    },
  ]

  for (const review of dummyReviews) {
    const existing = await payload.find({
      collection: 'reviews',
      where: {
        customerName: {
          equals: review.customerName,
        },
      },
      limit: 1,
    })

    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'reviews',
        data: review,
      })
      payload.logger.info(`  ✓ Created review from: ${review.customerName} (${review.status})`)
    } else {
      payload.logger.info(`  → Review from "${review.customerName}" already exists, skipping`)
    }
  }

  // 4. Seed Global SiteSettings
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      contactEmail: 'ahoj@zozahrady.sk',
      contactPhone: '+421 948 123 456',
      instagramUrl: 'https://instagram.com/zozahrady',
      facebookUrl: 'https://facebook.com/zozahrady',
      showVykvetBadge: true,
      showBeskydyBadge: true,
    },
  })
  payload.logger.info('  ✓ Updated global: SiteSettings')

  payload.logger.info('🌸 Seeding completed successfully!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Error during seeding:', err)
  process.exit(1)
})

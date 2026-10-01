import 'dotenv/config'
import { getPayload, type Payload } from 'payload'
import type { Page } from './payload-types'
import config from './payload.config'

type LocaleCode = 'sk' | 'cs'

type LayoutBlock = NonNullable<Page['layout']>[number]

interface PageSeed {
  slug: string
  showInMenu: boolean
  menuOrder: number
  title: Record<LocaleCode, string>
  menuLabel: Record<LocaleCode, string>
  seoTitle?: Record<LocaleCode, string>
  seoDescription?: Record<LocaleCode, string>
  layout: Record<LocaleCode, LayoutBlock[]>
}

function richText(paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      format: '' as const,
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        format: '' as const,
        indent: 0,
        version: 1,
        direction: 'ltr' as const,
        children: [{ type: 'text', format: 0, text, version: 1 }],
      })),
    },
  }
}

const PAGE_SEEDS: PageSeed[] = [
  {
    slug: 'home',
    showInMenu: false,
    menuOrder: 0,
    title: { sk: 'Hlavná stránka', cs: 'Hlavní stránka' },
    menuLabel: { sk: 'Domov', cs: 'Domů' },
    seoTitle: {
      sk: 'zozahrady | Kvetinová farma',
      cs: 'zozahrady | Květinová farma',
    },
    seoDescription: {
      sk: 'Sezónne ekologicky pestované kytice a svadobná kvetinová výzdoba priamo z našej záhrady.',
      cs: 'Sezónní ekologicky pěstované kytice a svatební květinová výzdoba přímo z naší zahrady.',
    },
    layout: {
      sk: [
        {
          blockType: 'hero',
          eyebrow: 'Ekologická kvetinová farma',
          heading: 'Kytice s láskou viazané, priamo z našej záhrady',
          subheading:
            'Pestujeme sezónne slovenské kvety s rešpektom k prírode. Prinášame čerstvú radosť do vašich domovov a nezabudnuteľnú atmosféru na svadobné stoly.',
          primaryCtaLabel: 'Prezrieť kytice',
          primaryCtaHref: '/kytice',
          secondaryCtaLabel: 'Svadobný dopyt',
          secondaryCtaHref: '/svadby',
        },
        {
          blockType: 'bouquetsList',
          anchorId: 'kytice',
          heading: 'Naše kytice',
          intro:
            'Sezónne viazané kytice z našej záhrady. Každá kytica je jedinečná a viazaná s láskou.',
        },
        {
          blockType: 'weddingCta',
          anchorId: 'svadby',
          eyebrow: 'Svadobné kytice',
          heading: 'Svadby',
          body: 'Vytvoríme pre vás svadobné kytice a výzdobu presne podľa vašich predstáv. Od nevestinej kytice cez kytice pre družičky až po výzdobu svadobného stola — staráme sa o každý detail s láskou a citom pre krásu.',
          ctaLabel: 'Poslať dopyt',
          ctaHref: '/kontakt',
        },
        {
          blockType: 'reviewsList',
          anchorId: 'recenzie',
          heading: 'Recenzie',
          intro: 'Čo o nás hovoria naši zákazníci',
        },
        {
          blockType: 'richText',
          anchorId: 'o-nas',
          eyebrow: 'O nás',
          heading: 'O farme',
          content: richText([
            'zozahrady je rodinná kvetinová farma, ktorá pestuje sezónne kvety s rešpektom k prírode. Veríme, že krásne kvety rastú tam, kde im doprajeme čas a lásku.',
            'Naše kytice viažeme ručne z čerstvo nazbieraných kvetov, bez zbytočných plastov a s dôrazom na udržateľnosť. Každá kytica je jedinečná — ako príroda samotná.',
          ]),
        },
        {
          blockType: 'contactInfo',
          anchorId: 'kontakt',
          heading: 'Kontakt',
          subheading: 'Máte otázku alebo chcete objednať? Ozvite sa nám.',
        },
      ],
      cs: [
        {
          blockType: 'hero',
          eyebrow: 'Ekologická květinová farma',
          heading: 'Kytice s láskou vázané, přímo z naší zahrady',
          subheading:
            'Pěstujeme sezónní květiny s respektem k přírodě. Přinášíme čerstvou radost do vašich domovů a nezapomenutelnou atmosféru na svatební stoly.',
          primaryCtaLabel: 'Prohlédnout kytice',
          primaryCtaHref: '/kytice',
          secondaryCtaLabel: 'Svatební poptávka',
          secondaryCtaHref: '/svadby',
        },
        {
          blockType: 'bouquetsList',
          anchorId: 'kytice',
          heading: 'Naše kytice',
          intro:
            'Sezónní vázané kytice z naší zahrady. Každá kytice je jedinečná a vázaná s láskou.',
        },
        {
          blockType: 'weddingCta',
          anchorId: 'svadby',
          eyebrow: 'Svatební kytice',
          heading: 'Svatby',
          body: 'Vytvoříme pro vás svatební kytice a výzdobu přesně podle vašich představ. Od nevěstiny kytice přes kytice pro družičky až po výzdobu svatebního stolu — staráme se o každý detail s láskou a citem pro krásu.',
          ctaLabel: 'Poslat poptávku',
          ctaHref: '/kontakt',
        },
        {
          blockType: 'reviewsList',
          anchorId: 'recenzie',
          heading: 'Recenze',
          intro: 'Co o nás říkají naši zákazníci',
        },
        {
          blockType: 'richText',
          anchorId: 'o-nas',
          eyebrow: 'O nás',
          heading: 'O farmě',
          content: richText([
            'zozahrady je rodinná květinová farma, která pěstuje sezónní květiny s respektem k přírodě. Věříme, že krásné květiny rostou tam, kde jim dopřejeme čas a lásku.',
            'Naše kytice vážeme ručně z čerstvě nasbíraných květů, bez zbytečných plastů a s důrazem na udržitelnost. Každá kytice je jedinečná — jako příroda samotná.',
          ]),
        },
        {
          blockType: 'contactInfo',
          anchorId: 'kontakt',
          heading: 'Kontakt',
          subheading: 'Máte otázku nebo chcete objednat? Ozvěte se nám.',
        },
      ],
    },
  },
  {
    slug: 'kytice',
    showInMenu: true,
    menuOrder: 1,
    title: { sk: 'Kytice', cs: 'Kytice' },
    menuLabel: { sk: 'Kytice', cs: 'Kytice' },
    layout: {
      sk: [
        {
          blockType: 'hero',
          eyebrow: 'Sezónne kytice',
          heading: 'Naše kytice',
          subheading:
            'Sezónne viazané kytice z našej záhrady. Každá kytica je jedinečná a viazaná s láskou.',
        },
        {
          blockType: 'bouquetsList',
          anchorId: 'kytice',
          heading: 'Aktuálne v ponuke',
          intro: 'Ceny sa môžu líšiť podľa sezóny a dostupnosti kvetov.',
        },
      ],
      cs: [
        {
          blockType: 'hero',
          eyebrow: 'Sezónní kytice',
          heading: 'Naše kytice',
          subheading:
            'Sezónní vázané kytice z naší zahrady. Každá kytice je jedinečná a vázaná s láskou.',
        },
        {
          blockType: 'bouquetsList',
          anchorId: 'kytice',
          heading: 'Aktuálně v nabídce',
          intro: 'Ceny se mohou lišit podle sezóny a dostupnosti květin.',
        },
      ],
    },
  },
  {
    slug: 'svadby',
    showInMenu: true,
    menuOrder: 2,
    title: { sk: 'Svadby', cs: 'Svatby' },
    menuLabel: { sk: 'Svadby', cs: 'Svatby' },
    layout: {
      sk: [
        {
          blockType: 'hero',
          eyebrow: 'Svadobné kytice',
          heading: 'Svadby',
          subheading: 'Kvetinová výzdoba na mieru — od nevestinej kytice až po svadobné stoly.',
        },
        {
          blockType: 'weddingCta',
          anchorId: 'svadby',
          eyebrow: 'Svadobné kytice',
          heading: 'Povedzte nám svoju predstavu',
          body: 'Vytvoríme pre vás svadobné kytice a výzdobu presne podľa vašich predstáv. Od nevestinej kytice cez kytice pre družičky až po výzdobu svadobného stola — staráme sa o každý detail s láskou a citom pre krásu.',
          ctaLabel: 'Poslať dopyt',
          ctaHref: '/kontakt',
        },
      ],
      cs: [
        {
          blockType: 'hero',
          eyebrow: 'Svatební kytice',
          heading: 'Svatby',
          subheading: 'Květinová výzdoba na míru — od nevěstiny kytice až po svatební stoly.',
        },
        {
          blockType: 'weddingCta',
          anchorId: 'svadby',
          eyebrow: 'Svatební kytice',
          heading: 'Řekněte nám svou představu',
          body: 'Vytvoříme pro vás svatební kytice a výzdobu přesně podle vašich představ. Od nevěstiny kytice přes kytice pro družičky až po výzdobu svatebního stolu — staráme se o každý detail s láskou a citem pro krásu.',
          ctaLabel: 'Poslat poptávku',
          ctaHref: '/kontakt',
        },
      ],
    },
  },
  {
    slug: 'recenzie',
    showInMenu: true,
    menuOrder: 3,
    title: { sk: 'Recenzie', cs: 'Recenze' },
    menuLabel: { sk: 'Recenzie', cs: 'Recenze' },
    layout: {
      sk: [
        {
          blockType: 'hero',
          eyebrow: 'Referencie',
          heading: 'Recenzie',
          subheading: 'Čo o nás hovoria naši zákazníci.',
        },
        {
          blockType: 'reviewsList',
          anchorId: 'recenzie',
          heading: 'Vaše skúsenosti',
          intro: 'Ďakujeme za každé milé slovo.',
        },
      ],
      cs: [
        {
          blockType: 'hero',
          eyebrow: 'Reference',
          heading: 'Recenze',
          subheading: 'Co o nás říkají naši zákazníci.',
        },
        {
          blockType: 'reviewsList',
          anchorId: 'recenzie',
          heading: 'Vaše zkušenosti',
          intro: 'Děkujeme za každé milé slovo.',
        },
      ],
    },
  },
  {
    slug: 'o-nas',
    showInMenu: true,
    menuOrder: 4,
    title: { sk: 'O farme', cs: 'O farmě' },
    menuLabel: { sk: 'O farme', cs: 'O farmě' },
    layout: {
      sk: [
        {
          blockType: 'hero',
          eyebrow: 'O nás',
          heading: 'O farme',
          subheading: 'Rodinná kvetinová farma s láskou k prírode.',
        },
        {
          blockType: 'richText',
          anchorId: 'o-nas',
          content: richText([
            'zozahrady je rodinná kvetinová farma, ktorá pestuje sezónne kvety s rešpektom k prírode. Veríme, že krásne kvety rastú tam, kde im doprajeme čas a lásku.',
            'Naše kytice viažeme ručne z čerstvo nazbieraných kvetov, bez zbytočných plastov a s dôrazom na udržateľnosť. Každá kytica je jedinečná — ako príroda samotná.',
          ]),
        },
      ],
      cs: [
        {
          blockType: 'hero',
          eyebrow: 'O nás',
          heading: 'O farmě',
          subheading: 'Rodinná květinová farma s láskou k přírodě.',
        },
        {
          blockType: 'richText',
          anchorId: 'o-nas',
          content: richText([
            'zozahrady je rodinná květinová farma, která pěstuje sezónní květiny s respektem k přírodě. Věříme, že krásné květiny rostou tam, kde jim dopřejeme čas a lásku.',
            'Naše kytice vážeme ručně z čerstvě nasbíraných květů, bez zbytečných plastů a s důrazem na udržitelnost. Každá kytice je jedinečná — jako příroda samotná.',
          ]),
        },
      ],
    },
  },
  {
    slug: 'kontakt',
    showInMenu: true,
    menuOrder: 5,
    title: { sk: 'Kontakt', cs: 'Kontakt' },
    menuLabel: { sk: 'Kontakt', cs: 'Kontakt' },
    layout: {
      sk: [
        {
          blockType: 'hero',
          eyebrow: 'Kontakt',
          heading: 'Kontakt',
          subheading: 'Máte otázku alebo chcete objednať? Ozvite sa nám.',
        },
        {
          blockType: 'contactInfo',
          anchorId: 'kontakt',
          heading: 'Spojte sa s nami',
          subheading: 'Napíšte nám alebo zavolajte — ozveme sa čo najskôr.',
        },
      ],
      cs: [
        {
          blockType: 'hero',
          eyebrow: 'Kontakt',
          heading: 'Kontakt',
          subheading: 'Máte otázku nebo chcete objednat? Ozvěte se nám.',
        },
        {
          blockType: 'contactInfo',
          anchorId: 'kontakt',
          heading: 'Spojte se s námi',
          subheading: 'Napište nám nebo zavolejte — ozveme se co nejdříve.',
        },
      ],
    },
  },
]

/**
 * Writes one page in both locales. The layout blocks field itself is not
 * localized (shared structure); localized inner text fields are written
 * per-locale, reusing block ids from the first write.
 */
async function writePageLocales(payload: Payload, pageId: number, seed: PageSeed): Promise<void> {
  const updated = await payload.update({
    collection: 'pages',
    id: pageId,
    locale: 'sk',
    draft: false,
    data: {
      title: seed.title.sk,
      menuLabel: seed.menuLabel.sk,
      seoTitle: seed.seoTitle?.sk,
      seoDescription: seed.seoDescription?.sk,
      showInMenu: seed.showInMenu,
      menuOrder: seed.menuOrder,
      layout: seed.layout.sk,
      _status: 'published',
    },
  })

  const layoutWithIds = updated.layout ?? []
  const csLayout = seed.layout.cs.map((block, index) => ({
    ...block,
    id: layoutWithIds[index]?.id ?? undefined,
  }))

  await payload.update({
    collection: 'pages',
    id: pageId,
    locale: 'cs',
    draft: false,
    data: {
      title: seed.title.cs,
      menuLabel: seed.menuLabel.cs,
      seoTitle: seed.seoTitle?.cs,
      seoDescription: seed.seoDescription?.cs,
      layout: csLayout,
      _status: 'published',
    },
  })
}

async function ensurePage(payload: Payload, seed: PageSeed): Promise<void> {
  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: seed.slug } },
    limit: 1,
    locale: 'all',
    draft: true,
  })

  if (existing.docs.length === 0) {
    const created = await payload.create({
      collection: 'pages',
      locale: 'sk',
      draft: false,
      data: {
        slug: seed.slug,
        showInMenu: seed.showInMenu,
        menuOrder: seed.menuOrder,
        title: seed.title.sk,
        menuLabel: seed.menuLabel.sk,
        seoTitle: seed.seoTitle?.sk,
        seoDescription: seed.seoDescription?.sk,
        layout: seed.layout.sk,
        _status: 'published',
      },
    })

    const layoutWithIds = created.layout ?? []
    const csLayout = seed.layout.cs.map((block, index) => ({
      ...block,
      id: layoutWithIds[index]?.id ?? undefined,
    }))

    await payload.update({
      collection: 'pages',
      id: created.id,
      locale: 'cs',
      draft: false,
      data: {
        title: seed.title.cs,
        menuLabel: seed.menuLabel.cs,
        seoTitle: seed.seoTitle?.cs,
        seoDescription: seed.seoDescription?.cs,
        layout: csLayout,
        _status: 'published',
      },
    })
    payload.logger.info(`  ✓ Created page: ${seed.slug}`)
    return
  }

  const doc = existing.docs[0]
  const hasLayout = Array.isArray(doc.layout) && doc.layout.length > 0
  const titles = doc.title as unknown as Partial<Record<LocaleCode, string>>

  if (!hasLayout) {
    // Legacy page (e.g. the pre-blocks `home` page) — upgrade it in place.
    await writePageLocales(payload, doc.id, seed)
    payload.logger.info(`  ✓ Upgraded page with block layout: ${seed.slug}`)
  } else if (!titles?.cs) {
    // Page exists with a layout but no Czech translation — add cs texts only.
    await payload.update({
      collection: 'pages',
      id: doc.id,
      locale: 'cs',
      draft: false,
      data: {
        title: seed.title.cs,
        menuLabel: seed.menuLabel.cs,
        seoTitle: seed.seoTitle?.cs,
        seoDescription: seed.seoDescription?.cs,
        layout: seed.layout.cs.map((block, index) => ({
          ...block,
          id: doc.layout?.[index]?.id ?? undefined,
        })),
        _status: 'published',
      },
    })
    payload.logger.info(`  ✓ Added Czech translation: ${seed.slug}`)
  } else {
    payload.logger.info(`  → Page "${seed.slug}" already exists with layout, skipping`)
  }
}

const BOUQUET_SEEDS = [
  {
    title: 'Lúčna nostalgia',
    description:
      'Voňavá kytica plná poľných a lúčnych kvetov, harmančeka, rebríčka a jemných tráv viazaná v prirodzenom vzdušnom štýle.',
    csTitle: 'Louční nostalgie',
    csDescription:
      'Vonná kytice plná polních a lučních květů, heřmánku, řebříčku a jemných trav vázaná v přirozeném vzdušném stylu.',
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
    csTitle: 'Sluneční venkov',
    csDescription:
      'Zářivá kompozice se slunečnicemi, zíniemi, měsíčkem a barevnými kráskami, která do vašeho domova přinese hřejivé letní paprsky.',
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
    csTitle: 'Romantická zahrada',
    csDescription:
      'Elegantní kytice s pivoňkami, anglickými růžemi, černuchou a voňavým eukalyptem vhodná na slavnostní příležitosti a zásnuby.',
    isAvailable: true,
    variants: [
      { size: 'Small' as const, priceEUR: 32, priceCZK: 790 },
      { size: 'Medium' as const, priceEUR: 48, priceCZK: 1190 },
      { size: 'Large' as const, priceEUR: 68, priceCZK: 1680 },
    ],
  },
]

async function ensureBouquets(payload: Payload): Promise<void> {
  for (const bouquet of BOUQUET_SEEDS) {
    const existing = await payload.find({
      collection: 'bouquets',
      where: { title: { equals: bouquet.title } },
      limit: 1,
      locale: 'all',
    })

    if (existing.docs.length === 0) {
      const created = await payload.create({
        collection: 'bouquets',
        locale: 'sk',
        data: {
          title: bouquet.title,
          description: bouquet.description,
          isAvailable: bouquet.isAvailable,
          variants: bouquet.variants,
        },
      })
      await payload.update({
        collection: 'bouquets',
        id: created.id,
        locale: 'cs',
        data: {
          title: bouquet.csTitle,
          description: bouquet.csDescription,
        },
      })
      payload.logger.info(`  ✓ Created bouquet: ${bouquet.title}`)
      continue
    }

    // Existing bouquet (e.g. prod data): add the Czech translation only when missing.
    const titles = existing.docs[0].title as unknown as Partial<Record<LocaleCode, string>>
    if (!titles?.cs) {
      await payload.update({
        collection: 'bouquets',
        id: existing.docs[0].id,
        locale: 'cs',
        data: {
          title: bouquet.csTitle,
          description: bouquet.csDescription,
        },
      })
      payload.logger.info(`  ✓ Added Czech translation for bouquet: ${bouquet.title}`)
    } else {
      payload.logger.info(`  → Bouquet "${bouquet.title}" already exists, skipping`)
    }
  }
}

const REVIEW_SEEDS = [
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

async function ensureReviews(payload: Payload): Promise<void> {
  for (const review of REVIEW_SEEDS) {
    const existing = await payload.find({
      collection: 'reviews',
      where: { customerName: { equals: review.customerName } },
      limit: 1,
    })

    if (existing.totalDocs === 0) {
      await payload.create({ collection: 'reviews', data: review })
      payload.logger.info(`  ✓ Created review from: ${review.customerName} (${review.status})`)
    } else {
      payload.logger.info(`  → Review from "${review.customerName}" already exists, skipping`)
    }
  }
}

const SITE_SETTINGS_DEFAULTS: Record<string, string | boolean> = {
  contactEmail: 'ahoj@zozahrady.sk',
  contactPhone: '+421 948 123 456',
  instagramUrl: 'https://instagram.com/zozahrady',
  facebookUrl: 'https://facebook.com/zozahrady',
  showVykvetBadge: true,
  showBeskydyBadge: true,
}

async function ensureSiteSettings(payload: Payload): Promise<void> {
  // Never overwrite values that already exist (prod has real contact info).
  const settings = await payload.findGlobal({ slug: 'site-settings' })
  const current = settings as unknown as Record<string, unknown>
  const updates: Record<string, string | boolean> = {}
  for (const [key, value] of Object.entries(SITE_SETTINGS_DEFAULTS)) {
    if (current[key] === undefined || current[key] === null || current[key] === '') {
      updates[key] = value
    }
  }
  if (Object.keys(updates).length > 0) {
    await payload.updateGlobal({ slug: 'site-settings', data: updates })
    payload.logger.info(`  ✓ Filled empty SiteSettings fields: ${Object.keys(updates).join(', ')}`)
  } else {
    payload.logger.info('  → SiteSettings already filled, skipping')
  }
}

export async function seed(): Promise<void> {
  const payload = await getPayload({ config })
  payload.logger.info('🌸 Starting zozahrady data seeding...')

  payload.logger.info('Pages:')
  for (const page of PAGE_SEEDS) {
    await ensurePage(payload, page)
  }

  payload.logger.info('Bouquets:')
  await ensureBouquets(payload)

  payload.logger.info('Reviews:')
  await ensureReviews(payload)

  payload.logger.info('Globals:')
  await ensureSiteSettings(payload)

  payload.logger.info('🌸 Seeding completed successfully!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Error during seeding:', err)
  process.exit(1)
})

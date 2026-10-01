import { getPayload, Payload } from 'payload'
import config from '@/payload.config'

import { describe, it, beforeAll, expect } from 'vitest'

let payload: Payload

describe('API', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  })

  it('fetches users', async () => {
    const users = await payload.find({
      collection: 'users',
    })
    expect(users).toBeDefined()
  })

  it('pages are localized with drafts enabled', () => {
    const pages = payload.collections.pages.config
    expect(pages.versions?.drafts).toBeTruthy()
    const namedFields = pages.fields.filter(
      (field): field is typeof field & { name: string } => 'name' in field,
    )
    const localizedNames = namedFields
      .filter((field) => 'localized' in field && field.localized === true)
      .map((field) => field.name)
    expect(localizedNames).toEqual(expect.arrayContaining(['title', 'menuLabel']))
    const layout = namedFields.find((field) => field.name === 'layout')
    expect(layout).toBeDefined()
    expect(layout?.type).toBe('blocks')
  })

  it('bouquets have localized title and description', () => {
    const bouquets = payload.collections.bouquets.config
    const localizedNames = bouquets.fields
      .filter((field): field is typeof field & { name: string } => 'name' in field)
      .filter((field) => 'localized' in field && field.localized === true)
      .map((field) => field.name)
    expect(localizedNames).toEqual(expect.arrayContaining(['title', 'description']))
  })

  it('queries pages with a Payload locale without errors', async () => {
    const sk = await payload.find({ collection: 'pages', locale: 'sk', draft: false, limit: 1 })
    const cs = await payload.find({ collection: 'pages', locale: 'cs', draft: false, limit: 1 })
    expect(Array.isArray(sk.docs)).toBe(true)
    expect(Array.isArray(cs.docs)).toBe(true)
  })
})

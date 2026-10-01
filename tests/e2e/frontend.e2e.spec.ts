import { test, expect, Page } from '@playwright/test'

test.describe('Frontend', () => {
  let page: Page

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext()
    page = await context.newPage()
  })

  test('renders the CMS-driven homepage', async () => {
    await page.goto('http://localhost:3000')

    const heading = page.locator('h1').first()
    await expect(heading).toBeVisible()
  })

  test('navbar links point to real CMS page paths', async () => {
    await page.goto('http://localhost:3000')

    await expect(page.locator('header nav a[href="/kontakt"]')).toBeVisible()
    await expect(page.locator('header nav a[href^="#"]')).toHaveCount(0)
  })

  test('renders a seeded CMS page at its real path', async () => {
    await page.goto('http://localhost:3000/kontakt')

    const heading = page.locator('h1').first()
    await expect(heading).toHaveText('Kontakt')
  })

  test('redirects /home to /', async ({ page: freshPage }) => {
    const response = await freshPage.goto('http://localhost:3000/home')
    expect(response?.status()).toBe(200)
    await expect(freshPage).toHaveURL(/localhost:3000\/?$/)
  })

  test('returns 404 for unknown slugs', async () => {
    const response = await page.goto('http://localhost:3000/nepodla-nazvu')
    expect(response?.status()).toBe(404)
  })
})

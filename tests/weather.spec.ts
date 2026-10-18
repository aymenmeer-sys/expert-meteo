import { test, expect } from '@playwright/test'

const uniqueEmail = () => `e2e-${Date.now()}@example.com`

 test('dashboard météo affiche les modules principaux', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Carte interactive')).toBeVisible()
  await expect(page.getByText('Prévisions horaires')).toBeVisible()
})

test('inscription puis accès au dashboard', async ({ page }) => {
  await page.goto('/sign-up')
  await page.getByPlaceholder('Nom').fill('E2E Test')
  await page.getByLabel('Email').fill(uniqueEmail())
  await page.getByLabel('Mot de passe').fill('TestPassword-2026!')
  await page.getByRole('button', { name: 'Créer mon compte' }).click()
  await expect(page).toHaveURL(/\/$/)
  await expect(page.getByText('Prévisions horaires')).toBeVisible()
})

test('la page connexion est accessible', async ({ page }) => {
  await page.goto('/sign-in')
  await expect(page.getByRole('heading', { name: /se connecter/i })).toBeVisible()
  await expect(page.getByLabel('Email')).toBeVisible()
  await expect(page.getByLabel('Mot de passe')).toBeVisible()
})

test('recherche de ville et changement de langue', async ({ page }) => {
  await page.goto('/')
  const search = page.getByPlaceholder('Rechercher une ville...')
  await search.fill('Lyon')
  await search.press('Enter')
  await expect(page.getByText('Lyon, France', { exact: true })).toBeVisible()
  const language = page.getByRole('button', { name: 'Changer la langue' })
  await language.click()
  await expect(language).toHaveText('EN')
  await expect(page.getByText('Hourly forecast')).toBeVisible()
})

test('ajout d’un favori local', async ({ page }) => {
  await page.goto('/')
  const favorite = page.getByRole('button', { name: 'Ajouter aux favoris' })
  await expect(favorite).toHaveAttribute('aria-pressed', 'false')
  await favorite.click()
  await expect(favorite).toHaveAttribute('aria-pressed', 'true')
})

test('navigation sur le globe 3D', async ({ page }) => {
  await page.goto('/immersif')
  await expect(page.getByRole('heading', { name: 'Globe météo immersif' })).toBeVisible()
  await expect(page.locator('canvas')).toBeVisible()
  await page.mouse.click(500, 400)
})

test('les APIs exposent des erreurs contrôlées', async ({ request }) => {
  const unknownCity = await request.get('/api/weather?city=zzzzzzville-inexistante')
  expect(unknownCity.status()).toBe(404)
  const invalidCoordinates = await request.get('/api/weather/specialized?latitude=999&longitude=0')
  expect(invalidCoordinates.status()).toBe(400)
  const openapi = await request.get('/api/v2/openapi')
  expect(openapi.ok()).toBeTruthy()
})

test('les pages SEO locales sont indexables', async ({ page }) => {
  await page.goto('/villes/paris')
  await expect(page).toHaveTitle(/Météo Paris/i)
  await expect(page.getByRole('heading', { name: 'Météo à Paris' })).toBeVisible()
  await page.goto('/actualites')
  await expect(page).toHaveTitle(/Actualités météo/i)
  await expect(page.getByRole('heading', { name: /La météo expliquée clairement/i })).toBeVisible()
})

test('le manifeste PWA est exposé', async ({ request }) => {
  const response = await request.get('/manifest.webmanifest')
  expect(response.ok()).toBeTruthy()
  const manifest = await response.json()
  expect(manifest.name).toBe('MétéoExpert')
  expect(manifest.display).toBe('standalone')
})

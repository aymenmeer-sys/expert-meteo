import { test, expect } from '@playwright/test'

test('dashboard météo affiche les modules principaux', async ({ page }) => {
  test.skip(!process.env.CI, 'E2E exécutés uniquement dans GitHub Actions')
  await page.goto('/')
  await expect(page.getByText('Carte interactive')).toBeVisible()
  await expect(page.getByText('Prévisions horaires')).toBeVisible()
})

test('la page connexion est accessible', async ({ page }) => {
  test.skip(!process.env.CI, 'E2E exécutés uniquement dans GitHub Actions')
  await page.goto('/sign-in')
  await expect(page.getByRole('heading', { name: /se connecter/i })).toBeVisible()
  await expect(page.getByLabel('Email')).toBeVisible()
  await expect(page.getByLabel('Mot de passe')).toBeVisible()
})

test('les contrôles de langue et de modèle sont disponibles', async ({ page }) => {
  test.skip(!process.env.CI, 'E2E exécutés uniquement dans GitHub Actions')
  await page.goto('/')
  const language = page.getByRole('button', { name: 'Changer la langue' })
  await expect(language).toHaveText('FR')
  await language.click()
  await expect(language).toHaveText('EN')
  const model = page.getByRole('button', { name: 'Changer le modèle météo' })
  await expect(model).toHaveText('Auto')
  await model.click()
  await expect(model).toHaveText('ECMWF')
})

test('les pages SEO locales sont indexables', async ({ page }) => {
  test.skip(!process.env.CI, 'E2E exécutés uniquement dans GitHub Actions')
  await page.goto('/villes/paris')
  await expect(page).toHaveTitle(/Météo Paris/i)
  await expect(page.getByRole('heading', { name: 'Météo à Paris' })).toBeVisible()
  await page.goto('/actualites')
  await expect(page).toHaveTitle(/Actualités météo/i)
  await expect(page.getByRole('heading', { name: /La météo expliquée clairement/i })).toBeVisible()
})

test('le skip link est visible au clavier', async ({ page }) => {
  test.skip(!process.env.CI, 'E2E exécutés uniquement dans GitHub Actions')
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Aller au contenu principal' })).toBeVisible()
})

test('le manifeste PWA est exposé', async ({ request }) => {
  test.skip(!process.env.CI, 'E2E exécutés uniquement dans GitHub Actions')
  const response = await request.get('/manifest.webmanifest')
  expect(response.ok()).toBeTruthy()
  const manifest = await response.json()
  expect(manifest.name).toBe('MétéoExpert')
  expect(manifest.display).toBe('standalone')
})

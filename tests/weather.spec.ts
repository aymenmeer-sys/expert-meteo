import { test, expect } from '@playwright/test'

test('dashboard météo affiche les modules principaux', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Carte interactive')).toBeVisible()
  await expect(page.getByText('Prévisions horaires')).toBeVisible()
})

test('la page connexion est accessible', async ({ page }) => {
  await page.goto('/sign-in')
  await expect(page.getByRole('heading', { name: /connexion/i })).toBeVisible()
})

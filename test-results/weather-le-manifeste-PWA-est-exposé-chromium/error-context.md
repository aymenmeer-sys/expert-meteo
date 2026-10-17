# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: weather.spec.ts >> le manifeste PWA est exposé
- Location: tests/weather.spec.ts:28:5

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | test('dashboard météo affiche les modules principaux', async ({ page }) => {
  4  |   await page.goto('/')
  5  |   await expect(page.getByText('Carte interactive')).toBeVisible()
  6  |   await expect(page.getByText('Prévisions horaires')).toBeVisible()
  7  | })
  8  | 
  9  | test('la page connexion est accessible', async ({ page }) => {
  10 |   await page.goto('/sign-in')
  11 |   await expect(page.getByRole('heading', { name: /connexion/i })).toBeVisible()
  12 |   await expect(page.getByLabel('Email')).toBeVisible()
  13 |   await expect(page.getByLabel('Mot de passe')).toBeVisible()
  14 | })
  15 | 
  16 | test('les contrôles de langue et de modèle sont disponibles', async ({ page }) => {
  17 |   await page.goto('/')
  18 |   const language = page.getByRole('button', { name: 'Changer la langue' })
  19 |   await expect(language).toHaveText('FR')
  20 |   await language.click()
  21 |   await expect(language).toHaveText('EN')
  22 |   const model = page.getByRole('button', { name: 'Changer le modèle météo' })
  23 |   await expect(model).toHaveText('Auto')
  24 |   await model.click()
  25 |   await expect(model).toHaveText('ECMWF')
  26 | })
  27 | 
  28 | test('le manifeste PWA est exposé', async ({ request }) => {
  29 |   const response = await request.get('/manifest.webmanifest')
> 30 |   expect(response.ok()).toBeTruthy()
     |                         ^ Error: expect(received).toBeTruthy()
  31 |   const manifest = await response.json()
  32 |   expect(manifest.name).toBe('MétéoExpert')
  33 |   expect(manifest.display).toBe('standalone')
  34 | })
  35 | 
```
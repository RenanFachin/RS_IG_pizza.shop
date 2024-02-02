import { expect, test } from '@playwright/test'

test('sign in successfully', async ({ page }) => {
  // como na config do playwrigth já ta definida a baseURL
  // networkidle -> aguarda todas as requisições darem como finalizadas
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  // Ações
  await page.getByLabel('Seu e-mail').fill('johndoe@example.com')
  await page.getByRole('button', { name: 'Acessar painel' }).click()

  const toast = page.getByText(
    'Enviamos um link de autenticação para o e-mail informado.',
  )

  expect(toast).toBeVisible()

  await page.waitForTimeout(3000) // maneira para não "bugar" o playwright (evitando tela branca após a finalização do teste)
})

test('sign in with wrong credentials', async ({ page }) => {
  // como na config do playwrigth já ta definida a baseURL
  // networkidle -> aguarda todas as requisições darem como finalizadas
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  // Ações
  await page.getByLabel('Seu e-mail').fill('wrong@example.com')
  await page.getByRole('button', { name: 'Acessar painel' }).click()

  const toast = page.getByText('Credenciais inválidas.')

  expect(toast).toBeVisible()

  await page.waitForTimeout(3000) // maneira para não "bugar" o playwright (evitando tela branca após a finalização do teste)
})

test('navigate to new restaurant page', async ({ page }) => {
  // como na config do playwrigth já ta definida a baseURL
  // networkidle -> aguarda todas as requisições darem como finalizadas
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Novo estabelecimento' }).click()

  expect(page.url()).toContain('/sign-up')
})

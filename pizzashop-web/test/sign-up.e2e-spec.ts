import { expect, test } from '@playwright/test'

test('sign up successfully', async ({ page }) => {
  // como na config do playwrigth já ta definida a baseURL
  // networkidle -> aguarda todas as requisições darem como finalizadas
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  // Ações
  await page.getByLabel('Nome do estabelecimento').fill('Pizza Shop')
  await page.getByLabel('Seu nome').fill('dasdasd')
  await page.getByLabel('Seu e-mail').fill('dasdas@email.com')
  await page.getByLabel('Seu telefone').fill('12312312312')
  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Restaurante cadastrado com sucesso!')

  expect(toast).toBeVisible()

  await page.waitForTimeout(3000)
})

test('sign up with error', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  // Ações
  await page.getByLabel('Nome do estabelecimento').fill('Wrong Shop')
  await page.getByLabel('Seu nome').fill('dasdasd')
  await page.getByLabel('Seu e-mail').fill('dasdas@email.com')
  await page.getByLabel('Seu telefone').fill('12312312312')
  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Erro ao cadastrar restaurante.')

  expect(toast).toBeVisible()
})

test('navigate to login page', async ({ page }) => {
  // como na config do playwrigth já ta definida a baseURL
  // networkidle -> aguarda todas as requisições darem como finalizadas
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Fazer login' }).click()

  expect(page.url()).toContain('/sign-in')
})

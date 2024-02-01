import { http, HttpResponse } from 'msw'

import { UpdateProfileBody } from '../updated-profile'

export const updateProfileMock = http.put<never, UpdateProfileBody>(
  '/profile',
  async ({ request }) => {
    // obtendo o body da requisição (é uma promisse)
    const { name } = await request.json()

    // Criando um "teste" para verificar o email digitado e criando uma autenticação de sucesso
    if (name === 'Rocket Pizza') {
      return new HttpResponse(null, {
        status: 204,
      })
    }

    return new HttpResponse(null, { status: 400 })
  },
)

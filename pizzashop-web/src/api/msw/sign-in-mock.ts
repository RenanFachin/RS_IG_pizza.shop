import { http, HttpResponse } from 'msw'

import { SignInBody } from '../sign-in'

export const signInMock = http.post<never, SignInBody>(
  '/authenticate',
  async ({ request }) => {
    // obtendo o body da requisição (é uma promisse)
    const { email } = await request.json()

    // Criando um "teste" para verificar o email digitado e criando uma autenticação de sucesso
    if (email === 'johndoe@example.com') {
      return new HttpResponse(null, {
        status: 200,
        // preenchendo o cookie (facilita os testes)
        headers: {
          'Set-Cookie': 'auth=sample-jwt',
        },
      })
    }

    return new HttpResponse(null, { status: 401 })
  },
)

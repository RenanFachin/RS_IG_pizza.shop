import { http, HttpResponse } from 'msw'

import { RegisterRestaurantBody } from '../registerRestaurant'

export const registerRestaurantMock = http.post<never, RegisterRestaurantBody>(
  '/restaurants',
  async ({ request }) => {
    // obtendo o body da requisição (é uma promisse)
    const { restaurantName } = await request.json()

    // Criando um "teste" para verificar o email digitado e criando uma autenticação de sucesso
    if (restaurantName === 'Pizza Shop') {
      return new HttpResponse(null, {
        status: 201,
      })
    }

    return new HttpResponse(null, { status: 400 })
  },
)

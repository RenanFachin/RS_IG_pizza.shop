import { http, HttpResponse } from 'msw'

import { GetPopularProductsResponse } from '../../charts/get-popular-products'

export const getPopularProductMock = http.get<
  never,
  never,
  GetPopularProductsResponse // formato do retorno
>('/metrics/popular-products', () => {
  return HttpResponse.json([
    {
      product: 'Pizza 01',
      amount: 5,
    },
    {
      product: 'Pizza 02',
      amount: 9,
    },
    {
      product: 'Pizza 03',
      amount: 12,
    },
    {
      product: 'Pizza 04',
      amount: 4,
    },
    {
      product: 'Pizza 05',
      amount: 2,
    },
  ])
})

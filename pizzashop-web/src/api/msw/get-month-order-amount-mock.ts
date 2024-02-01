import { http, HttpResponse } from 'msw'

import { GetMonthOrdersAmountResponse } from '../dashboard-metrics/get-month-orders-amount'

export const getMonthOrdersAmountMock = http.get<
  never,
  never,
  GetMonthOrdersAmountResponse // formato do retorno
>('/metrics/month-orders-amount', () => {
  return HttpResponse.json({
    amount: 200,
    diffFromLastMonth: 7,
  })
})

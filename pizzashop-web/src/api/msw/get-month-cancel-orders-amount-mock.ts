import { http, HttpResponse } from 'msw'

import { GetMonthCanceledOrdersAmountResponse } from '../dashboard-metrics/get-month-canceled-orders-amount'

export const getMonthCanceledOrdersAmountMock = http.get<
  never,
  never,
  GetMonthCanceledOrdersAmountResponse // formato do retorno
>('/metrics/month-canceled-orders-amount', () => {
  return HttpResponse.json({
    amount: 5,
    diffFromLastMonth: -5,
  })
})

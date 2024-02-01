import { http, HttpResponse } from 'msw'

import { GetMonthRevenueResponse } from '../dashboard-metrics/get-month-revenue'

export const getMonthRevenueMock = http.get<
  never,
  never,
  GetMonthRevenueResponse // formato do retorno
>('/metrics/month-receipt', () => {
  return HttpResponse.json({
    receipt: 50000,
    diffFromLastMonth: 10,
  })
})

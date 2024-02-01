import { http, HttpResponse } from 'msw'

import { GetDailyRevenueInPeriodResponse } from '../../charts/get-daily-revenue-in-period'

export const getDailyRevenueInPeriod = http.get<
  never,
  never,
  GetDailyRevenueInPeriodResponse // formato do retorno
>('/metrics/daily-receipt-in-period', () => {
  return HttpResponse.json([
    {
      date: '01/02/2024',
      receipt: 2000,
    },
    {
      date: '02/02/2024',
      receipt: 400,
    },
    {
      date: '03/02/2024',
      receipt: 1222,
    },
    {
      date: '04/02/2024',
      receipt: 2500,
    },
    {
      date: '05/02/2024',
      receipt: 600,
    },
    {
      date: '06/02/2024',
      receipt: 4000,
    },
    {
      date: '07/02/2024',
      receipt: 480,
    },
  ])
})

import { setupWorker } from 'msw/browser'

import { env } from '@/env'

import { getDailyRevenueInPeriod } from './charts/get-daily-revenue-in-period-mock'
import { getPopularProductMock } from './charts/get-popular-products-mock'
import { getDayOrdersAmountMock } from './get-day-orders-amount-mock'
import { getMonthCanceledOrdersAmountMock } from './get-month-cancel-orders-amount-mock'
import { getMonthOrdersAmountMock } from './get-month-order-amount-mock'
import { getMonthRevenueMock } from './get-month-revenue-mock'
import { registerRestaurantMock } from './register-restaurant-mock'
import { signInMock } from './sign-in-mock'

export const worker = setupWorker(
  signInMock,
  registerRestaurantMock,
  getDayOrdersAmountMock,
  getMonthRevenueMock,
  getMonthOrdersAmountMock,
  getMonthCanceledOrdersAmountMock,
  getDailyRevenueInPeriod,
  getPopularProductMock,
)

export async function enableMSW() {
  if (env.MODE !== 'test') {
    return
  }

  await worker.start()
}

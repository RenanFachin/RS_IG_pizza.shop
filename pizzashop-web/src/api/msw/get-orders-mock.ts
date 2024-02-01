import { http, HttpResponse } from 'msw'

import type { GetOrdersResponse } from '../get-orders'

// Criando uma listagem de pedidos fictícios
type Orders = GetOrdersResponse['orders']
type OrderStatus = GetOrdersResponse['orders'][number]['status']

const statuses: OrderStatus[] = [
  'pending',
  'canceled',
  'delivered',
  'delivering',
  'processing',
]
/* 
i % 5
i = 1 -> 1 % 5 = 1
.
.
.
i = 6 -> 6 % 5 = 1
*/

const orders: Orders = Array.from({ length: 60 }).map((_, i) => {
  return {
    orderId: `order-${i + 1}`,
    customerName: `Customer ${i + 1}`,
    createdAt: new Date().toISOString(),
    total: Math.random() * 100000,
    status: statuses[i % 5],
  }
})

export const getOrdersMock = http.get<never, never, GetOrdersResponse>(
  '/orders',
  async ({ request }) => {
    // Transformando uma string em url new URL(request.url) e desestruturando para receber os searchParams
    const { searchParams } = new URL(request.url)

    const pageIndex = searchParams.get('pageIndex')
      ? Number(searchParams.get('pageIndex'))
      : 0

    const customerName = searchParams.get('customerName')
    const orderId = searchParams.get('orderId')
    const status = searchParams.get('status')

    let filteredOrders = orders

    if (customerName) {
      // Retornando apenas os pedidos que sejam relacionados ao searchParams customerName
      filteredOrders = filteredOrders.filter((order) =>
        order.customerName.includes(customerName),
      )
    }

    if (orderId) {
      // Retornando apenas os pedidos que sejam relacionados ao searchParams orderId
      filteredOrders = filteredOrders.filter((order) =>
        order.customerName.includes(orderId),
      )
    }

    if (status) {
      // Retornando apenas os pedidos que sejam relacionados ao searchParams orderId
      filteredOrders = filteredOrders.filter((order) => order.status === status)
    }

    // Fazendo um slice sempre de 10 elementos
    const paginatedOrders = filteredOrders.slice(
      pageIndex * 10,
      (pageIndex + 1) * 10,
    )

    return HttpResponse.json({
      orders: paginatedOrders,
      meta: {
        pageIndex,
        perPage: 10,
        totalCount: filteredOrders.length,
      },
    })
  },
)

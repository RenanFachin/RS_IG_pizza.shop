import axios from 'axios'

import { env } from '@/env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true, // Determina que os cookies podem ser lidos pelo backend
})

// Caso a variável de ambiente esteja definida como true, todas requisições serão interceptadas
// Fazendo isto para testar a aplicação durante um loading mais demorado
if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.round(Math.random() * 3000)),
    )

    return config
  })
}

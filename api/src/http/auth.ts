import cookie from '@elysiajs/cookie'
import jwt from '@elysiajs/jwt'
import { Elysia, t, type Static } from 'elysia'
import { env } from '../env'

const jwtPayload = t.Object({
  sub: t.String(),
  restaurantId: t.Optional(t.String()),
})

export const auth = new Elysia()
  .use(
    jwt({
      secret: env.JWT_SECRET_KEY,
      schema: jwtPayload,
    }),
  )
  .use(cookie())
  .derive(({ jwt, setCookie, removeCookie, cookie }) => {
    return {
      // Static faz com que as tipagens sejam compreendidas
      signUser: async (payload: Static<typeof jwtPayload>) => {
        const token = await jwt.sign(payload)

        setCookie('auth', token, {
          httpOnly: true, // não deixa vísivel pelo client-side
          maxAge: 60 * 60 * 24 * 7, // 7 dias
          path: '/',
        })
      },

      signOut: () => {
        removeCookie('auth')
      },

      getCurrentUser: async () => {
        const payload = await jwt.verify(cookie.auth)

        if (!payload) {
          throw new Error('Unauthorized')
        }

        return {
          userId: payload.sub,
          restaurantID: payload.restaurantId,
        }
      },
    }
  })

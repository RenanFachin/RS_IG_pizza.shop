import { Elysia, t } from 'elysia'
import { db } from '../../db/connection'
import dayjs from 'dayjs'
import { auth } from '../auth'
import { authLinks } from '../../db/schema'
import { eq } from 'drizzle-orm'

// .use(auth) -> contém os módulos de jwt e cookies
export const authenticateFromlink = new Elysia().use(auth).get(
  '/auth-links/authenticate',
  async ({ query, jwt, setCookie, set }) => {
    const { code, redirect } = query

    // verificando se é válido
    const authLinkFromCode = await db.query.authLinks.findFirst({
      where(fields, operators) {
        return operators.eq(fields.code, code)
      },
    })

    if (!authLinkFromCode) {
      throw new Error('Auth link not found')
    }

    // Validando se o link vou criado em um terminado periodo de tempo
    const daysSinceAuthLinkWasCreated = dayjs().diff(
      authLinkFromCode.createdAt,
      'days',
    )

    if (daysSinceAuthLinkWasCreated > 7) {
      throw new Error('Auth link expired, please generate a new one.')
    }

    // Verificando se o usuário gerencia algum restaurante
    const managedRestaurant = await db.query.restaurants.findFirst({
      where(fields, operators) {
        return operators.eq(fields.managerId, authLinkFromCode.userId)
      },
    })

    const token = await jwt.sign({
      sub: authLinkFromCode.userId,
      restaurantId: managedRestaurant?.id,
    })

    setCookie('auth', token, {
      httpOnly: true, // não deixa vísivel pelo client-side
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: '/',
    })

    // Apagando o link da tabela para que ele não possa ser utilizado para autenticação novamente
    await db.delete(authLinks).where(eq(authLinks.code, code))

    // redirecionando o usuário (redirect vem por parâmetro da rota)
    set.redirect = redirect
  },
  {
    // Validação do que como params na rota
    query: t.Object({
      code: t.String(),
      redirect: t.String(),
    }),
  },
)

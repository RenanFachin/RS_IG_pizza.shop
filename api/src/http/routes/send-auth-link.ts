import { Elysia, t } from 'elysia'
import { db } from '../../db/connection'
import { createId } from '@paralleldrive/cuid2'
import { authLinks } from '../../db/schema'
import { env } from '../../env'

// eq = equal -> Usada para comparar se dois valores são iguais
// ne = not equal

export const sendAuthLink = new Elysia().post(
  '/authenticate',
  async ({ body }) => {
    const { email } = body

    // userFromEmail tem o retorno como um array, porém, o email é unico e o retorno será sempre de 1 dado por isso o [userFromEmail] para fazer a desestruturação para um objeto
    const userFromEmail = await db.query.users.findFirst({
      where(fields, operators) {
        return operators.eq(fields.email, email)
      },
    })

    if (!userFromEmail) {
      throw new Error('User not found.')
    }

    // criando o link
    const authLinkCode = createId()

    // Inserindo na tabela authLinks o id do usuário e o linkcode criado
    await db.insert(authLinks).values({
      userId: userFromEmail.id,
      code: authLinkCode,
    })

    // Enviar um e-mail (utilizar resend)

    const authLink = new URL('/auth-links/authenticate', env.API_BASE_URL)
    authLink.searchParams.set('code', authLinkCode)
    // http://localhost:3333/auth-links/authenticate?code=authLinkCode

    // Enviando o usuário para o front-end
    authLink.searchParams.set('redirect', env.AUTH_REDIRECT_URL)

    console.log(authLink.toString())
  },
  {
    // Validação
    body: t.Object({
      email: t.String({ format: 'email' }),
    }),
  },
)

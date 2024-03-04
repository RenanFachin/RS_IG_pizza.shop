import { Elysia, t } from 'elysia'
import { db } from '../../db/connection'
import { createId } from '@paralleldrive/cuid2'
import { authLinks } from '../../db/schema'
import { env } from '../../env'
import { mail } from '../../lib/nodemailer'
import nodemailer from 'nodemailer'

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

    const authLink = new URL('/auth-links/authenticate', env.API_BASE_URL)
    authLink.searchParams.set('code', authLinkCode)
    // http://localhost:3333/auth-links/authenticate?code=authLinkCode

    // Enviando o usuário para o front-end
    authLink.searchParams.set('redirect', env.AUTH_REDIRECT_URL)

    // Enviar um e-mail (utilizar resend ou nodemailer)
    const info = await mail.sendMail({
      from: {
        name: 'Pizza shop',
        address: 'hi@pizzashop.com',
      },
      to: email,
      subject: 'Authenticate to Pizza Shop',
      text: `Use the following link to authenticate on Pizza Shop: ${authLink.toString()}`,
    })

    console.log(authLink.toString())
    console.log(nodemailer.getTestMessageUrl(info))
  },
  {
    // Validação
    body: t.Object({
      email: t.String({ format: 'email' }),
    }),
  },
)

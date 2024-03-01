import { Elysia } from 'elysia'
import { auth } from '../auth'
import { db } from '../../db/connection'

export const getProfile = new Elysia()
  .use(auth)
  .get('/me', async ({ getCurrentUser }) => {
    const { userId } = await getCurrentUser()

    const user = await db.query.users.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, userId)
      },
    })

    if (!user) {
      throw new Error('User not found.')
    }

    return user
  })

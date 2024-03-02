import { Elysia } from 'elysia'
import { auth } from '../auth'
import { db } from '../../db/connection'

export const getManagedRestaurant = new Elysia()
  .use(auth)
  .get('/managed-restaurant', async ({ getCurrentUser }) => {
    const { restaurantID } = await getCurrentUser()

    if (!restaurantID) {
      throw new Error('User is not a manager.')
    }

    const managedRestaurant = await db.query.restaurants.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, restaurantID)
      },
    })

    return managedRestaurant
  })

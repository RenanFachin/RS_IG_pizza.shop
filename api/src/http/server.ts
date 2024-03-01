import { Elysia } from 'elysia' // Elysia é uma classe, precisamos instanciar
import { registerRestaurant } from './routes/register-restaurant'
import { sendAuthLink } from './routes/send-auth-link'

import { authenticateFromlink } from './routes/authenticate-from-link'
import { signOut } from './routes/sign-out'

const app = new Elysia()
  .use(registerRestaurant)
  .use(sendAuthLink)
  .use(authenticateFromlink)
  .use(signOut)

app.listen(3333, () => {
  console.log('🛸 HTTP server running!')
})

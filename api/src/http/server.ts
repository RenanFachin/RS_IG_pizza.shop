import { Elysia } from 'elysia' // Elysia é uma classe, precisamos instanciar

const app = new Elysia().get('/', () => {
  return 'Hello world!'
})


app.listen(3333, () => {
  console.log('🛸 HTTP server running!')
})
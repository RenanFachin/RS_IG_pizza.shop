import { Elysia } from 'elysia' // Elysia é uma classe, precisamos instanciar

const app = new Elysia()

app.get('/', () => {
  return 'Hello world from BUN!'
})

app.listen(3333, () => {
  console.log('🛸 HTTP server running!')
})

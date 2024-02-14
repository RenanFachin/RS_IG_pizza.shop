import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'

// conexão com o db
const connection = postgres('posgresql://docker:docker@localhost:5432/pizzashop', {
  max: 1
})

// conexão do drizzle
const db = drizzle(connection)

await migrate(db, {
  migrationsFolder: 'drizzle'
}) //migrationsFolder precisa refletir o out do arquivo drizzle.config]


// Encerrando
await connection.end()
process.exit()
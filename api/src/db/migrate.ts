import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { env } from '../env'
import chalk from 'chalk'

// conexão com o db
const connection = postgres(env.DATABASE_URL, {
  max: 1,
})

// conexão do drizzle
const db = drizzle(connection)

await migrate(db, {
  migrationsFolder: 'drizzle',
}) // migrationsFolder precisa refletir o out do arquivo drizzle.config]

console.log(chalk.bgGreenBright('Migrations applied successfully!'))

// Encerrando
await connection.end()
process.exit()

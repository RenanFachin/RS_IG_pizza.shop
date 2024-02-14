import { faker } from '@faker-js/faker'
import { restaurants, users } from './schema'
import { db } from './connection'
import chalk from 'chalk'


/**
 *  1 -> Reset database
 */

await db.delete(users)
await db.delete(restaurants)

console.log(chalk.yellow('✔ Database reset!'))


/**
 *  2 -> Create customers
 */

await db.insert(users).values([
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: 'customer'
  },
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: 'customer'
  }
])

console.log(chalk.yellow('✔ Created customers!'))

/**
 *  3 -> Create manager
 */

const [manager] = await db.insert(users).values([
  {
    name: faker.person.fullName(),
    email: 'admin@admin.com',
    role: 'manager'
  }
]).returning({
  managerSeedId: users.id
})

console.log(chalk.yellow('✔ Created manager!'))

/**
 *  4 -> Create restaurant
 */

await db.insert(restaurants).values([
  {
    name: faker.company.name(),
    description: faker.lorem.paragraph(),
    managerId: manager.managerSeedId
  }
])

console.log(chalk.yellow('✔ Created restaurant!'))

console.log(chalk.greenBright('Database seeded successfully!'))
process.exit()

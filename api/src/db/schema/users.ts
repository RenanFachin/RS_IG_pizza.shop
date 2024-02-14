import { text, timestamp, pgTable, pgEnum } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'

// Criando uma validação para a role de cadastros
export const userRoleEnum = pgEnum('user_role', ['manager', 'customer'])

// text("id").$defaultFn() -> o valor será definido através de uma function
export const users = pgTable("users", {
  id: text("id").$defaultFn(() => createId()).primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  role: userRoleEnum('role').default('customer').notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});


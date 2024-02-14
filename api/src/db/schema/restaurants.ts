import { text, timestamp, pgTable } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'
import { users } from './users'
import { relations } from 'drizzle-orm'

export const restaurants = pgTable("restaurants", {
  id: text("id").$defaultFn(() => createId()).primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  managerId: text('manager_id').references(() => users.id, {
    onDelete: 'set null' // caso o usuário seja deletado, apenas definir como null
  }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});


export const restaurantsRelations = relations(restaurants, ({ one }) => {
  // todo restaurante tem 1 gerente => many:one
  return {
    manager: one(users, {
      fields: [restaurants.managerId],
      references: [users.id],
      relationName: 'restaurant_manager'
    }) // os restaurantes tem 1 gerente
  }
})
import { uniqueIndex } from "drizzle-orm/pg-core";
import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  email: text().notNull().unique(),
});

export const courses = pgTable("courses", {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull().unique(),
  description: text(),
});

export const enrollments = pgTable(
  "enrollments",
  {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid()
      .notNull()
      .references(() => users.id),
    courseId: uuid()
      .notNull()
      .references(() => courses.id),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  // Se ja houver alguma matricula com userId e courseId iguais, a matricula nao sera criada.
  (table) => [uniqueIndex().on(table.userId, table.courseId)]
);

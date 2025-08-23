import { drizzle } from "drizzle-orm/node-postgres";

// Connection with the database
export const db = drizzle(process.env.DATABASE_URL, {
  logger: process.env.NODE_ENV === "development",
});

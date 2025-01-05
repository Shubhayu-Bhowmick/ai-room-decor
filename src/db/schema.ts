import { pgTable, varchar, text, integer, uniqueIndex } from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: varchar("id", { length: 255 }).primaryKey(), // Auto-incrementing primary key
    name: text("name").notNull(), // User name (required)
    email: text("email").notNull(), // Email address (required)
    imageUrl: text("image_url"), // Optional image URL
    credits: integer("credits").default(5), // Default credits set to 0
  },
  (table) => {
    return {
      emailIndex: uniqueIndex("email_idx").on(table.email), // Ensures email is unique
    };
  }
);



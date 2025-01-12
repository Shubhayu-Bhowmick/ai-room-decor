import { pgTable, varchar, text, integer, uniqueIndex, foreignKey, timestamp } from "drizzle-orm/pg-core";

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


export const roomRedesigns = pgTable(
    "room_redesigns",
    {
      id: varchar("id", { length: 255 }).primaryKey(), // Unique ID for the redesign entry
      originalImageUrl: text("original_image_url").notNull(), // Original image URL (required)
      modifiedImageUrl: text("modified_image_url").notNull(), // AI-modified image URL (required)
      userId: varchar("user_id", { length: 255 }).notNull(), // ID of the user who created it
      designStyle: text("design_style").notNull(), // Design style (required)
      additionalDetails: text("additional_details"), // Optional additional design details
      roomType: text("room_type").notNull(), // Type of room (e.g., living room, bedroom)
      createdAt: timestamp("created_at").defaultNow(), // Timestamp for creation
    },
    (table) => {
      return {
        userForeignKey: foreignKey({
          columns: [table.userId],
          foreignColumns: [users.id],
        }), // Foreign key linking to the user who created the redesign
      };
    }
  );
import { pgTable, text, serial, integer, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define Character Schema
export const characters = pgTable("characters", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  traits: text("traits").array().notNull(),
  avatar: text("avatar").notNull(),
  bio: text("bio").notNull(),
  borderColor: text("border_color").notNull().default("primary"),
});

export const insertCharacterSchema = createInsertSchema(characters).omit({
  id: true
});

// Define Item Schema
export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  characterId: integer("character_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  significance: text("significance").notNull(),
  category: text("category").notNull(),
  resource: text("resource").notNull().default("No resource available"), // Required with default
});

export const insertItemSchema = createInsertSchema(items).omit({
  id: true
});

// Keeping the users table for compatibility
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Define all the types
export type Character = typeof characters.$inferSelect;
export type InsertCharacter = z.infer<typeof insertCharacterSchema>;
export type Item = typeof items.$inferSelect;
export type InsertItem = z.infer<typeof insertItemSchema>;
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Plant disease related schemas
export const plantDiseases = pgTable("plant_diseases", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // fungal, bacterial, viral, pest, etc.
  severity: text("severity").notNull(), // low, moderate, severe
  description: text("description").notNull(),
  symptoms: text("symptoms").notNull(),
  images: text("images").array(),
  affectedPlants: text("affected_plants").array(),
});

export const insertPlantDiseaseSchema = createInsertSchema(plantDiseases).omit({
  id: true,
});

export const diseaseOutbreaks = pgTable("disease_outbreaks", {
  id: serial("id").primaryKey(),
  diseaseId: integer("disease_id").notNull(),
  region: text("region").notNull(),
  latitude: text("latitude").notNull(),
  longitude: text("longitude").notNull(),
  detectedDate: timestamp("detected_date").notNull(),
  reportCount: integer("report_count").notNull(),
  status: text("status").notNull(), // active, contained, resolved
});

export const insertDiseaseOutbreakSchema = createInsertSchema(diseaseOutbreaks).omit({
  id: true,
});

export const treatments = pgTable("treatments", {
  id: serial("id").primaryKey(),
  diseaseId: integer("disease_id").notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(), // organic, chemical
  description: text("description").notNull(),
  instructions: text("instructions").notNull(),
});

export const insertTreatmentSchema = createInsertSchema(treatments).omit({
  id: true,
});

export const preventionMethods = pgTable("prevention_methods", {
  id: serial("id").primaryKey(),
  diseaseId: integer("disease_id").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
});

export const insertPreventionMethodSchema = createInsertSchema(preventionMethods).omit({
  id: true,
});

export const newsArticles = pgTable("news_articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  image: text("image").notNull(),
  category: text("category").notNull(), // alert, new research, tips
  publishedDate: timestamp("published_date").notNull(),
});

export const insertNewsArticleSchema = createInsertSchema(newsArticles).omit({
  id: true,
});

// Types for all the schemas
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertPlantDisease = z.infer<typeof insertPlantDiseaseSchema>;
export type PlantDisease = typeof plantDiseases.$inferSelect;

export type InsertDiseaseOutbreak = z.infer<typeof insertDiseaseOutbreakSchema>;
export type DiseaseOutbreak = typeof diseaseOutbreaks.$inferSelect;

export type InsertTreatment = z.infer<typeof insertTreatmentSchema>;
export type Treatment = typeof treatments.$inferSelect;

export type InsertPreventionMethod = z.infer<typeof insertPreventionMethodSchema>;
export type PreventionMethod = typeof preventionMethods.$inferSelect;

export type InsertNewsArticle = z.infer<typeof insertNewsArticleSchema>;
export type NewsArticle = typeof newsArticles.$inferSelect;

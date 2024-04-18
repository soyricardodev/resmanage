// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  numeric,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `res-manage_${name}`);

export const restaurants = createTable("restaurant", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  userId: varchar("userId", { length: 256 }),
  location: varchar("location", { length: 256 }),
  email: varchar("email", { length: 256 }),
  phone: varchar("phone", { length: 256 }),
  image: varchar("image", { length: 256 }).unique(),
  isPublished: boolean("is_published"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const restaurantBanners = createTable("restaurant_banner", {
  id: serial("id").primaryKey(),
  restaurantId: integer("restaurantId").references(() => restaurants.id, {
    onDelete: "restrict",
    onUpdate: "cascade",
  }),
  imageId: integer("imageId").references(() => images.id, {
    onDelete: "restrict",
    onUpdate: "cascade",
  }),
});

export const menus = createTable("menu", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  restaurantId: integer("restaurantId").references(() => restaurants.id, {
    onDelete: "restrict",
    onUpdate: "cascade",
  }),
  availableTime: varchar("availableTime", { length: 256 }),
  position: integer("position"),
  categories: varchar("categories", { length: 256 }),
});

export const categories = createTable("category", {
  id: serial("id").primaryKey(),
  userId: varchar("userId", { length: 256 }),
  name: varchar("name", { length: 256 }),
  position: integer("position"),
  menuId: integer("menuId").references(() => menus.id, {
    onDelete: "restrict",
    onUpdate: "cascade",
  }),
});

export const menuItems = createTable("menu_item", {
  id: serial("id").primaryKey(),
  userId: varchar("userId", { length: 256 }),
  name: varchar("name", { length: 256 }),
  description: varchar("description", { length: 256 }),
  price: numeric("price"),
  position: integer("position"),
  categoryId: integer("categoryId").references(() => categories.id, {
    onDelete: "restrict",
    onUpdate: "cascade",
  }),
  imageId: integer("imageId").references(() => images.id, {
    onDelete: "restrict",
    onUpdate: "cascade",
  }),
});

export const images = createTable("image", {
  id: serial("id").primaryKey(),
  url: varchar("url", { length: 256 }),
  blurHash: varchar("blurHash", { length: 256 }),
  alternativeText: varchar("alternativeText", { length: 256 }),
});

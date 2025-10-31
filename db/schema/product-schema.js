import {
  mysqlTable,
  varchar,
  text,
  timestamp,
  boolean,
  decimal,
  int,
  json,
} from "drizzle-orm/mysql-core";
import { users } from "./auth-schema";

// Table: categories
export const categories = mysqlTable("categories", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  image: varchar("image", { length: 500 }),
  parentId: varchar("parent_id", { length: 36 }),
  isActive: boolean("is_active").default(true),
  sortOrder: int("sort_order").default(0),
  createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Table: products
export const products = mysqlTable("products", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  description: text("description"),
  shortDescription: text("short_description"),
  categoryId: varchar("category_id", { length: 36 }).references(() => categories.id),
  vendorId: varchar("vendor_id", { length: 36 }).references(() => users.id),
  buyPrice: decimal("buy_price", { precision: 15, scale: 2 }).notNull(),
  sellPrice: decimal("sell_price", { precision: 15, scale: 2 }).notNull(),
  margin: decimal("margin", { precision: 15, scale: 2 }).notNull(),
  commissionRate: decimal("commission_rate", { precision: 5, scale: 2 }).default("0.00"),
  sku: varchar("sku", { length: 100 }).unique(),
  weight: decimal("weight", { precision: 10, scale: 2 }),
  images: json("images"), // Array of image URLs
  isActive: boolean("is_active").default(true),
  isFeatured: boolean("is_featured").default(false),
  metaTitle: varchar("meta_title", { length: 200 }),
  metaDescription: text("meta_description"),
  createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Table: inventory
export const inventory = mysqlTable("inventory", {
  id: varchar("id", { length: 36 }).primaryKey(),
  productId: varchar("product_id", { length: 36 }).references(() => products.id, { onDelete: "cascade" }),
  currentStock: int("current_stock").default(0),
  reservedStock: int("reserved_stock").default(0),
  minStock: int("min_stock").default(0),
  createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Table: product_reviews
export const productReviews = mysqlTable("product_reviews", {
  id: varchar("id", { length: 36 }).primaryKey(),
  productId: varchar("product_id", { length: 36 }).references(() => products.id, { onDelete: "cascade" }),
  userId: varchar("user_id", { length: 36 }).references(() => users.id, { onDelete: "cascade" }),
  orderId: varchar("order_id", { length: 36 }),
  rating: int("rating").notNull(), // 1-5
  review: text("review"),
  images: json("images"), // Array of review images
  isVerified: boolean("is_verified").default(false),
  helpfulCount: int("helpful_count").default(0),
  createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
import {
  mysqlTable,
  varchar,
  text,
  timestamp,
  int,
  boolean,
} from "drizzle-orm/mysql-core";

// Table: settings (Pengaturan sistem)
export const settings = mysqlTable("settings", {
  id: varchar("id", { length: 36 }).primaryKey(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  value: text("value").notNull(),
  description: text("description"),
  category: varchar("category", { length: 50 }).default("general"),
  isPublic: boolean("is_public").default(false), // Bisa diakses oleh frontend
  createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Table: system_logs (Log aktivitas sistem)
export const systemLogs = mysqlTable("system_logs", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: varchar("user_id", { length: 36 }),
  action: varchar("action", { length: 100 }).notNull(),
  module: varchar("module", { length: 50 }).notNull(),
  description: text("description"),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  metadata: text("metadata"), // JSON string
  createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
});

// Table: notifications (Notifikasi sistem)
export const notifications = mysqlTable("notifications", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: varchar("user_id", { length: 36 }),
  title: varchar("title", { length: 200 }).notNull(),
  message: text("message").notNull(),
  type: varchar("type", { length: 50 }).notNull(), // info, success, warning, error
  category: varchar("category", { length: 50 }).notNull(), // order, payment, system, etc.
  isRead: boolean("is_read").default(false),
  actionUrl: varchar("action_url", { length: 500 }),
  actionText: varchar("action_text", { length: 100 }),
  metadata: text("metadata"), // JSON string
  expiresAt: timestamp("expires_at", { fsp: 3 }),
  createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
});

// Table: banners (Banner/promosi)
export const banners = mysqlTable("banners", {
  id: varchar("id", { length: 36 }).primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  subtitle: varchar("subtitle", { length: 300 }),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  mobileImageUrl: varchar("mobile_image_url", { length: 500 }),
  linkUrl: varchar("link_url", { length: 500 }),
  linkText: varchar("link_text", { length: 100 }),
  type: varchar("type", { length: 50 }).notNull(), // hero, promo, category
  position: int("position").default(0),
  isActive: boolean("is_active").default(true),
  startDate: timestamp("start_date", { fsp: 3 }),
  endDate: timestamp("end_date", { fsp: 3 }),
  createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
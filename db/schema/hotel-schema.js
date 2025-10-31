import {
  mysqlTable,
  varchar,
  text,
  timestamp,
  boolean,
  decimal,
} from "drizzle-orm/mysql-core";

// Table: hotels (Mitra Hotel)
export const hotels = mysqlTable("hotels", {
  id: varchar("id", { length: 36 }).primaryKey(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  name: varchar("name", { length: 200 }).notNull(),
  address: text("address").notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  email: varchar("email", { length: 255 }),
  contactPerson: varchar("contact_person", { length: 200 }),
  commissionRate: decimal("commission_rate", { precision: 5, scale: 2 }).default("0.00"),
  isActive: boolean("is_active").default(true),
  qrCodeUrl: varchar("qr_code_url", { length: 500 }),
  createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Table: hotel_settings (Additional hotel configuration)
// export const hotelSettings = mysqlTable("hotel_settings", {
//   id: varchar("id", { length: 36 }).primaryKey(),
//   hotelId: varchar("hotel_id", { length: 36 }).references(() => hotels.id, { onDelete: "cascade" }),
//   key: varchar("key", { length: 100 }).notNull(),
//   value: text("value").notNull(),
//   description: text("description"),
//   createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
//   updatedAt: timestamp("updated_at", { fsp: 3 })
//     .defaultNow()
//     .$onUpdate(() => new Date())
//     .notNull(),
// });
import {
  mysqlTable,
  varchar,
  text,
  timestamp,
  mysqlEnum,
  int,
  boolean,
} from "drizzle-orm/mysql-core";
import { users } from "./auth-schema";
// Table: deliveries
export const deliveries = mysqlTable("deliveries", {
  id: varchar("id", { length: 36 }).primaryKey(),
  orderId: varchar("order_id", { length: 36 }),
  courierName: varchar("courier_name", { length: 200 }),
  courierPhone: varchar("courier_phone", { length: 20 }),
  deliveryMethod: mysqlEnum("delivery_method", ["courier", "pickup", "sales"]).default("courier"),
  trackingNumber: varchar("tracking_number", { length: 100 }),
  deliveryProof: varchar("delivery_proof", { length: 500 }),
  receivedProof: varchar("received_proof", { length: 500 }),
  pickupProof: varchar("pickup_proof", { length: 500 }),
  status: mysqlEnum("status", [
    "pending", "preparing", "ready_for_pickup", "picked_up",
    "in_transit", "delivered", "picked_up_by_customer", "failed"
  ]).default("pending"),
  estimatedDelivery: timestamp("estimated_delivery", { fsp: 3 }),
  deliveredAt: timestamp("delivered_at", { fsp: 3 }),
  pickedUpAt: timestamp("picked_up_at", { fsp: 3 }),
  notes: text("notes"),
  recipientName: varchar("recipient_name", { length: 200 }),
  recipientPhone: varchar("recipient_phone", { length: 20 }),
  createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Table: delivery_tracking (History pelacakan pengiriman)
export const deliveryTracking = mysqlTable("delivery_tracking", {
  id: varchar("id", { length: 36 }).primaryKey(),
  deliveryId: varchar("delivery_id", { length: 36 }).references(() => deliveries.id, { onDelete: "cascade" }),
  status: mysqlEnum("status", [
    "pending", "preparing", "ready_for_pickup", "picked_up",
    "in_transit", "delivered", "picked_up_by_customer", "failed"
  ]).notNull(),
  location: varchar("location", { length: 200 }),
  description: text("description").notNull(),
  createdBy: varchar("created_by", { length: 36 }).references(() => users.id),
  createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
});

// Table: delivery_areas (Area pengiriman yang dilayani)
export const deliveryAreas = mysqlTable("delivery_areas", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  description: text("description"),
  shippingCost: text("shipping_cost").notNull(),
  estimatedDays: int("estimated_days").default(1),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
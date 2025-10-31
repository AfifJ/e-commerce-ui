import {
  mysqlTable,
  varchar,
  text,
  timestamp,
  int,
  mysqlEnum,
} from "drizzle-orm/mysql-core";
import { users } from "./auth-schema";
import { hotels } from "./hotel-schema";
import { products } from "./product-schema";

// Table: orders
export const orders = mysqlTable("orders", {
  id: varchar("id", { length: 36 }).primaryKey(),
  orderNumber: varchar("order_number", { length: 50 }).notNull().unique(),
  userId: varchar("user_id", { length: 36 }).references(() => users.id),
  hotelId: varchar("hotel_id", { length: 36 }).references(() => hotels.id),
  salesId: varchar("sales_id", { length: 36 }).references(() => users.id),
  status: mysqlEnum("status", [
    "pending", "confirmed", "processing", "shipped",
    "delivered", "cancelled", "refunded"
  ]).default("pending"),
  subtotal: text("subtotal").notNull(),
  taxAmount: text("tax_amount").default("0"),
  shippingCost: text("shipping_cost").default("0"),
  discountAmount: text("discount_amount").default("0"),
  totalAmount: text("total_amount").notNull(),
  hotelCommission: text("hotel_commission").default("0"),
  salesCommission: text("sales_commission").default("0"),
  notes: text("notes"),
  cancellationReason: text("cancellation_reason"),
  shippingAddress: text("shipping_address"),
  createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Table: order_items
export const orderItems = mysqlTable("order_items", {
  id: varchar("id", { length: 36 }).primaryKey(),
  orderId: varchar("order_id", { length: 36 }).references(() => orders.id, { onDelete: "cascade" }),
  productId: varchar("product_id", { length: 36 }).references(() => products.id),
  productName: varchar("product_name", { length: 200 }).notNull(),
  quantity: int("quantity").notNull(),
  unitPrice: text("unit_price").notNull(),
  totalPrice: text("total_price").notNull(),
  vendorId: varchar("vendor_id", { length: 36 }).references(() => users.id),
  buyPrice: text("buy_price").notNull(),
  createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
});

// Table: order_status_history (Tracking status perubahan order)
export const orderStatusHistory = mysqlTable("order_status_history", {
  id: varchar("id", { length: 36 }).primaryKey(),
  orderId: varchar("order_id", { length: 36 }).references(() => orders.id, { onDelete: "cascade" }),
  fromStatus: mysqlEnum("from_status", [
    "pending", "confirmed", "processing", "shipped",
    "delivered", "cancelled", "refunded"
  ]),
  toStatus: mysqlEnum("to_status", [
    "pending", "confirmed", "processing", "shipped",
    "delivered", "cancelled", "refunded"
  ]).notNull(),
  notes: text("notes"),
  createdBy: varchar("created_by", { length: 36 }).references(() => users.id),
  createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
});
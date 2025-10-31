import {
  mysqlTable,
  varchar,
  text,
  timestamp,
  boolean,
  mysqlEnum,
  json,
} from "drizzle-orm/mysql-core";
import { users } from "./auth-schema";

// Table: payments
export const payments = mysqlTable("payments", {
  id: varchar("id", { length: 36 }).primaryKey(),
  orderId: varchar("order_id", { length: 36 }),
  paymentMethod: varchar("payment_method", { length: 100 }).notNull(),
  paymentGateway: varchar("payment_gateway", { length: 100 }).notNull(),
  gatewayReference: varchar("gateway_reference", { length: 200 }),
  amount: text("amount").notNull(),
  status: mysqlEnum("status", [
    "pending", "processing", "success", "failed", "cancelled", "refunded"
  ]).default("pending"),
  qrCodeUrl: varchar("qr_code_url", { length: 500 }),
  proofImage: varchar("proof_image", { length: 500 }),
  adminVerified: boolean("admin_verified").default(false),
  verifiedBy: varchar("verified_by", { length: 36 }).references(() => users.id),
  verifiedAt: timestamp("verified_at", { fsp: 3 }),
  currency: varchar("currency", { length: 3 }).default("IDR"),
  gatewayResponse: json("gateway_response"),
  paidAt: timestamp("paid_at", { fsp: 3 }),
  expiresAt: timestamp("expires_at", { fsp: 3 }),
  createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Table: payment_methods (Metode pembayaran yang tersedia)
export const paymentMethods = mysqlTable("payment_methods", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  type: mysqlEnum("type", ["qris", "transfer", "ewallet", "cash"]).notNull(),
  isActive: boolean("is_active").default(true),
  config: json("config"), // Konfigurasi khusus metode pembayaran
  icon: varchar("icon", { length: 500 }),
  description: text("description"),
  sortOrder: int("sort_order").default(0),
  createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Table: refunds
export const refunds = mysqlTable("refunds", {
  id: varchar("id", { length: 36 }).primaryKey(),
  paymentId: varchar("payment_id", { length: 36 }).references(() => payments.id),
  orderId: varchar("order_id", { length: 36 }),
  amount: text("amount").notNull(),
  reason: text("reason").notNull(),
  status: mysqlEnum("status", ["pending", "approved", "rejected", "processed"]).default("pending"),
  processedBy: varchar("processed_by", { length: 36 }).references(() => users.id),
  processedAt: timestamp("processed_at", { fsp: 3 }),
  refundMethod: varchar("refund_method", { length: 100 }),
  bankAccount: varchar("bank_account", { length: 200 }),
  adminNotes: text("admin_notes"),
  createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
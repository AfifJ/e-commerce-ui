import {
  mysqlTable,
  varchar,
  text,
  timestamp,
  int,
  mysqlEnum,
} from "drizzle-orm/mysql-core";
import { users } from "./auth-schema";

// Table: vendor_payments (Pembayaran ke vendor)
export const vendorPayments = mysqlTable("vendor_payments", {
  id: varchar("id", { length: 36 }).primaryKey(),
  vendorId: varchar("vendor_id", { length: 36 }).references(() => users.id),
  periodMonth: int("period_month").notNull(),
  periodYear: int("period_year").notNull(),
  totalSales: int("total_sales").notNull(),
  totalAmount: text("total_amount").notNull(),
  status: mysqlEnum("status", ["pending", "processing", "paid", "cancelled"]).default("pending"),
  paymentMethod: varchar("payment_method", { length: 100 }),
  bankAccount: varchar("bank_account", { length: 200 }),
  paidAt: timestamp("paid_at", { fsp: 3 }),
  processedBy: varchar("processed_by", { length: 36 }).references(() => users.id),
  notes: text("notes"),
  createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Table: commission_payments (Pembayaran komisi)
export const commissionPayments = mysqlTable("commission_payments", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: varchar("user_id", { length: 36 }).references(() => users.id),
  userType: mysqlEnum("user_type", ["sales", "hotel"]).notNull(),
  periodMonth: int("period_month").notNull(),
  periodYear: int("period_year").notNull(),
  totalCommission: text("total_commission").notNull(),
  totalTransactions: int("total_transactions").default(0),
  status: mysqlEnum("status", ["pending", "processing", "paid", "cancelled"]).default("pending"),
  paymentMethod: varchar("payment_method", { length: 100 }),
  bankAccount: varchar("bank_account", { length: 200 }),
  paidAt: timestamp("paid_at", { fsp: 3 }),
  processedBy: varchar("processed_by", { length: 36 }).references(() => users.id),
  notes: text("notes"),
  createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Table: sales_reports (Laporan penjualan per sales)
export const salesReports = mysqlTable("sales_reports", {
  id: varchar("id", { length: 36 }).primaryKey(),
  salesId: varchar("sales_id", { length: 36 }).references(() => users.id),
  reportDate: timestamp("report_date", { fsp: 3 }).notNull(),
  totalOrders: int("total_orders").default(0),
  totalRevenue: text("total_revenue").default("0"),
  totalCommission: text("total_commission").default("0"),
  productsSold: int("products_sold").default(0),
  createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
});

// Table: hotel_reports (Laporan transaksi per hotel)
export const hotelReports = mysqlTable("hotel_reports", {
  id: varchar("id", { length: 36 }).primaryKey(),
  hotelId: varchar("hotel_id", { length: 36 }),
  reportDate: timestamp("report_date", { fsp: 3 }).notNull(),
  totalOrders: int("total_orders").default(0),
  totalRevenue: text("total_revenue").default("0"),
  totalCommission: text("total_commission").default("0"),
  uniqueCustomers: int("unique_customers").default(0),
  createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
});
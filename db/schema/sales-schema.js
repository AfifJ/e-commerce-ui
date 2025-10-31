import {
  mysqlTable,
  varchar,
  text,
  timestamp,
  int,
  mysqlEnum,
} from "drizzle-orm/mysql-core";
import { users } from "./auth-schema";
import { products } from "./product-schema";

// Table: sales_borrows (Peminjaman produk oleh sales)
export const salesBorrows = mysqlTable("sales_borrows", {
  id: varchar("id", { length: 36 }).primaryKey(),
  salesId: varchar("sales_id", { length: 36 }).references(() => users.id),
  productId: varchar("product_id", { length: 36 }).references(() => products.id),
  borrowQuantity: int("borrow_quantity").notNull(),
  returnedQuantity: int("returned_quantity").default(0),
  status: mysqlEnum("status", ["borrowed", "returned", "partial"]).default("borrowed"),
  borrowDate: timestamp("borrow_date", { fsp: 3 }).defaultNow().notNull(),
  returnDate: timestamp("return_date", { fsp: 3 }),
  notes: text("notes"),
  createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Table: sales_transactions (Transaksi langsung oleh sales)
export const salesTransactions = mysqlTable("sales_transactions", {
  id: varchar("id", { length: 36 }).primaryKey(),
  salesId: varchar("sales_id", { length: 36 }).references(() => users.id),
  customerId: varchar("customer_id", { length: 36 }).references(() => users.id),
  hotelId: varchar("hotel_id", { length: 36 }),
  transactionNumber: varchar("transaction_number", { length: 50 }).notNull().unique(),
  totalAmount: text("total_amount").notNull(), // Using text for decimal to avoid precision issues
  commissionAmount: text("commission_amount").notNull(),
  status: mysqlEnum("status", ["pending", "confirmed", "cancelled"]).default("pending"),
  paymentMethod: varchar("payment_method", { length: 100 }),
  notes: text("notes"),
  createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Table: sales_transaction_items (Detail items transaksi sales)
export const salesTransactionItems = mysqlTable("sales_transaction_items", {
  id: varchar("id", { length: 36 }).primaryKey(),
  transactionId: varchar("transaction_id", { length: 36 }).references(() => salesTransactions.id, { onDelete: "cascade" }),
  productId: varchar("product_id", { length: 36 }).references(() => products.id),
  productName: varchar("product_name", { length: 200 }).notNull(),
  quantity: int("quantity").notNull(),
  unitPrice: text("unit_price").notNull(),
  totalPrice: text("total_price").notNull(),
  buyPrice: text("buy_price").notNull(),
  createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
});
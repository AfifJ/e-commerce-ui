"use server";

import { db } from "@/db";
import { salesBorrows, users, products, inventory } from "@/db/schema";
import { eq, and, desc, sql, lt } from "drizzle-orm";

// Get all borrows with user and product information
export async function getBorrows() {
  try {
    const result = await db
      .select({
        id: salesBorrows.id,
        salesId: salesBorrows.salesId,
        productId: salesBorrows.productId,
        borrowQuantity: salesBorrows.borrowQuantity,
        returnedQuantity: salesBorrows.returnedQuantity,
        status: salesBorrows.status,
        borrowDate: salesBorrows.borrowDate,
        returnDate: salesBorrows.returnDate,
        notes: salesBorrows.notes,
        createdAt: salesBorrows.createdAt,
        updatedAt: salesBorrows.updatedAt,
        sales: {
          id: users.id,
          name: users.name,
          username: users.username,
          email: users.email,
          role: users.role
        },
        product: {
          id: products.id,
          name: products.name,
          sku: products.sku,
          sellPrice: products.sellPrice,
          images: products.images
        }
      })
      .from(salesBorrows)
      .leftJoin(users, eq(salesBorrows.salesId, users.id))
      .leftJoin(products, eq(salesBorrows.productId, products.id))
      .orderBy(desc(salesBorrows.borrowDate));

    return result.map(item => ({
      ...item,
      borrowCode: `BOR-${item.borrowDate.toISOString().slice(0, 10).replace(/-/g, '')}-${item.id.slice(-3).toUpperCase()}`
    }));
  } catch (error) {
    console.error("Error fetching borrows:", error);
    return [];
  }
}

// Get borrow by ID
export async function getBorrowById(id) {
  try {
    const result = await db
      .select({
        id: salesBorrows.id,
        salesId: salesBorrows.salesId,
        productId: salesBorrows.productId,
        borrowQuantity: salesBorrows.borrowQuantity,
        returnedQuantity: salesBorrows.returnedQuantity,
        status: salesBorrows.status,
        borrowDate: salesBorrows.borrowDate,
        returnDate: salesBorrows.returnDate,
        notes: salesBorrows.notes,
        createdAt: salesBorrows.createdAt,
        updatedAt: salesBorrows.updatedAt,
        sales: {
          id: users.id,
          name: users.name,
          username: users.username,
          email: users.email,
          role: users.role
        },
        product: {
          id: products.id,
          name: products.name,
          sku: products.sku,
          sellPrice: products.sellPrice,
          images: products.images
        }
      })
      .from(salesBorrows)
      .leftJoin(users, eq(salesBorrows.salesId, users.id))
      .leftJoin(products, eq(salesBorrows.productId, products.id))
      .where(eq(salesBorrows.id, id))
      .limit(1);

    if (result.length === 0) return null;

    const item = result[0];
    return {
      ...item,
      borrowCode: `BOR-${item.borrowDate.toISOString().slice(0, 10).replace(/-/g, '')}-${item.id.slice(-3).toUpperCase()}`
    };
  } catch (error) {
    console.error("Error fetching borrow by ID:", error);
    return null;
  }
}

// Get sales users for dropdown
export async function getSalesUsers() {
  try {
    const result = await db
      .select({
        id: users.id,
        name: users.name,
        username: users.username,
        email: users.email,
        isActive: users.isActive
      })
      .from(users)
      .where(and(
        eq(users.role, "sales"),
        eq(users.isActive, true)
      ))
      .orderBy(users.name);

    return result;
  } catch (error) {
    console.error("Error fetching sales users:", error);
    return [];
  }
}

// Get available products for borrow
export async function getAvailableProductsForBorrow() {
  try {
    const result = await db
      .select({
        id: products.id,
        name: products.name,
        sku: products.sku,
        sellPrice: products.sellPrice,
        currentStock: inventory.currentStock,
        borrowedStock: sql`0`, // This would be calculated from borrows table
        isActive: products.isActive
      })
      .from(products)
      .leftJoin(inventory, eq(products.id, inventory.productId))
      .where(eq(products.isActive, true))
      .orderBy(products.name);

    // Calculate borrowed stock from existing borrows
    const productsWithBorrowedStock = await Promise.all(
      result.map(async (product) => {
        const borrowed = await db
          .select(sql`SUM(${salesBorrows.borrowQuantity} - ${salesBorrows.returnedQuantity})`)
          .from(salesBorrows)
          .where(and(
            eq(salesBorrows.productId, product.id),
            eq(salesBorrows.status, "borrowed")
          ));

        const borrowedQuantity = Number(borrowed[0]?.["SUM(borrow_quantity - returned_quantity)"] || 0);
        const availableStock = (product.currentStock || 0) - borrowedQuantity;

        return {
          ...product,
          borrowedStock: borrowedQuantity,
          availableStock,
          canBorrow: availableStock > 0
        };
      })
    );

    return productsWithBorrowedStock.filter(p => p.canBorrow);
  } catch (error) {
    console.error("Error fetching available products:", error);
    return [];
  }
}

// Create new borrow record
export async function createBorrow(data) {
  try {
    const id = crypto.randomUUID();

    // Check if product has enough stock
    const productStock = await db
      .select({
        currentStock: inventory.currentStock,
        borrowedStock: sql`SUM(CASE WHEN ${salesBorrows.status} = 'borrowed' THEN ${salesBorrows.borrowQuantity} - ${salesBorrows.returnedQuantity} ELSE 0 END)`
      })
      .from(inventory)
      .leftJoin(salesBorrows, eq(inventory.productId, salesBorrows.productId))
      .where(eq(inventory.productId, data.productId))
      .groupBy(inventory.productId)
      .limit(1);

    if (productStock.length > 0) {
      const currentStock = productStock[0].currentStock || 0;
      const borrowedStock = Number(productStock[0].borrowedStock || 0);
      const availableStock = currentStock - borrowedStock;

      if (data.borrowQuantity > availableStock) {
        throw new Error(`Only ${availableStock} units available for borrow`);
      }
    }

    // Create borrow record
    await db.insert(salesBorrows).values({
      id,
      salesId: data.salesId,
      productId: data.productId,
      borrowQuantity: data.borrowQuantity,
      returnedQuantity: 0,
      status: "borrowed",
      borrowDate: new Date(),
      notes: data.notes || null
    });

    // Update inventory reserved stock
    await updateInventoryForBorrow(data.productId, data.borrowQuantity, "reserve");

    // Return the created record
    return await getBorrowById(id);
  } catch (error) {
    console.error("Error creating borrow:", error);
    throw error;
  }
}

// Update borrow record
export async function updateBorrow(id, data) {
  try {
    await db
      .update(salesBorrows)
      .set({
        salesId: data.salesId,
        productId: data.productId,
        borrowQuantity: data.borrowQuantity,
        notes: data.notes,
        updatedAt: new Date()
      })
      .where(eq(salesBorrows.id, id));

    return await getBorrowById(id);
  } catch (error) {
    console.error("Error updating borrow:", error);
    throw error;
  }
}

// Return borrowed items
export async function returnBorrow(id) {
  try {
    const borrow = await getBorrowById(id);
    if (!borrow) {
      throw new Error("Borrow record not found");
    }

    if (borrow.status === "returned") {
      throw new Error("Items already returned");
    }

    const quantityToReturn = borrow.borrowQuantity - borrow.returnedQuantity;

    // Update borrow record
    await db
      .update(salesBorrows)
      .set({
        returnedQuantity: borrow.borrowQuantity,
        status: "returned",
        returnDate: new Date(),
        updatedAt: new Date()
      })
      .where(eq(salesBorrows.id, id));

    // Update inventory stock
    await updateInventoryForBorrow(borrow.productId, quantityToReturn, "return");

    return await getBorrowById(id);
  } catch (error) {
    console.error("Error returning borrow:", error);
    throw error;
  }
}

// Partial return
export async function partialReturn(id, returnedQuantity) {
  try {
    const borrow = await getBorrowById(id);
    if (!borrow) {
      throw new Error("Borrow record not found");
    }

    const newReturnedQuantity = borrow.returnedQuantity + returnedQuantity;

    if (newReturnedQuantity > borrow.borrowQuantity) {
      throw new Error("Cannot return more than borrowed quantity");
    }

    const isFullyReturned = newReturnedQuantity === borrow.borrowQuantity;

    // Update borrow record
    await db
      .update(salesBorrows)
      .set({
        returnedQuantity: newReturnedQuantity,
        status: isFullyReturned ? "returned" : "partial",
        returnDate: isFullyReturned ? new Date() : null,
        updatedAt: new Date()
      })
      .where(eq(salesBorrows.id, id));

    // Update inventory stock
    await updateInventoryForBorrow(borrow.productId, returnedQuantity, "return");

    return await getBorrowById(id);
  } catch (error) {
    console.error("Error partial returning borrow:", error);
    throw error;
  }
}

// Delete borrow record
export async function deleteBorrow(id) {
  try {
    const borrow = await getBorrowById(id);
    if (borrow) {
      // If not returned, restore inventory
      if (borrow.status !== "returned") {
        const quantityToRestore = borrow.borrowQuantity - borrow.returnedQuantity;
        await updateInventoryForBorrow(borrow.productId, quantityToRestore, "return");
      }
    }

    await db.delete(salesBorrows).where(eq(salesBorrows.id, id));
    return true;
  } catch (error) {
    console.error("Error deleting borrow:", error);
    throw error;
  }
}

// Helper function to update inventory for borrow operations
async function updateInventoryForBorrow(productId, quantity, operation) {
  try {
    const existingInventory = await db
      .select()
      .from(inventory)
      .where(eq(inventory.productId, productId))
      .limit(1);

    if (existingInventory.length > 0) {
      const currentInventory = existingInventory[0];

      if (operation === "reserve") {
        // Increase reserved stock
        await db
          .update(inventory)
          .set({
            reservedStock: currentInventory.reservedStock + quantity,
            updatedAt: new Date()
          })
          .where(eq(inventory.productId, productId));
      } else if (operation === "return") {
        // Decrease reserved stock and increase current stock
        await db
          .update(inventory)
          .set({
            currentStock: currentInventory.currentStock + quantity,
            reservedStock: Math.max(0, currentInventory.reservedStock - quantity),
            updatedAt: new Date()
          })
          .where(eq(inventory.productId, productId));
      }
    }
  } catch (error) {
    console.error("Error updating inventory for borrow:", error);
    throw error;
  }
}

// Get borrow statistics
export async function getBorrowStatistics() {
  try {
    const stats = await db
      .select({
        totalBorrows: sql`COUNT(*)`,
        activeBorrows: sql`COUNT(CASE WHEN ${salesBorrows.status} = 'borrowed' THEN 1 END)`,
        partialReturns: sql`COUNT(CASE WHEN ${salesBorrows.status} = 'partial' THEN 1 END)`,
        totalBorrowedItems: sql`SUM(${salesBorrows.borrowQuantity})`,
        totalReturnedItems: sql`SUM(${salesBorrows.returnedQuantity})`
      })
      .from(salesBorrows);

    return {
      totalBorrows: Number(stats[0]?.totalBorrows || 0),
      activeBorrows: Number(stats[0]?.activeBorrows || 0),
      partialReturns: Number(stats[0]?.partialReturns || 0),
      totalBorrowedItems: Number(stats[0]?.totalBorrowedItems || 0),
      totalReturnedItems: Number(stats[0]?.totalReturnedItems || 0)
    };
  } catch (error) {
    console.error("Error fetching borrow statistics:", error);
    return {
      totalBorrows: 0,
      activeBorrows: 0,
      partialReturns: 0,
      totalBorrowedItems: 0,
      totalReturnedItems: 0
    };
  }
}
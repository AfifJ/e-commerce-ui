"use server";

import { db } from "@/db";
import { inventory, products } from "@/db/schema";
import { eq, and, desc, sql } from "drizzle-orm";

// Get all inventory with product information
export async function getInventory() {
  try {
    const result = await db
      .select({
        id: inventory.id,
        productId: inventory.productId,
        currentStock: inventory.currentStock,
        reservedStock: inventory.reservedStock,
        minStock: inventory.minStock,
        availableStock: sql`${inventory.currentStock} - ${inventory.reservedStock}`,
        createdAt: inventory.createdAt,
        updatedAt: inventory.updatedAt,
        product: {
          id: products.id,
          name: products.name,
          sku: products.sku,
          buyPrice: products.buyPrice,
          sellPrice: products.sellPrice,
          images: products.images,
          isActive: products.isActive
        }
      })
      .from(inventory)
      .leftJoin(products, eq(inventory.productId, products.id))
      .orderBy(desc(inventory.updatedAt));

    return result.map(item => ({
      ...item,
      availableStock: Number(item.availableStock),
      lowStockThreshold: item.availableStock <= item.minStock,
      outOfStock: item.currentStock === 0
    }));
  } catch (error) {
    console.error("Error fetching inventory:", error);
    return [];
  }
}

// Get inventory by ID
export async function getInventoryById(id) {
  try {
    const result = await db
      .select({
        id: inventory.id,
        productId: inventory.productId,
        currentStock: inventory.currentStock,
        reservedStock: inventory.reservedStock,
        minStock: inventory.minStock,
        createdAt: inventory.createdAt,
        updatedAt: inventory.updatedAt,
        product: {
          id: products.id,
          name: products.name,
          sku: products.sku,
          buyPrice: products.buyPrice,
          sellPrice: products.sellPrice,
          images: products.images,
          isActive: products.isActive
        }
      })
      .from(inventory)
      .leftJoin(products, eq(inventory.productId, products.id))
      .where(eq(inventory.id, id))
      .limit(1);

    if (result.length === 0) return null;

    const item = result[0];
    return {
      ...item,
      availableStock: item.currentStock - item.reservedStock,
      lowStockThreshold: (item.currentStock - item.reservedStock) <= item.minStock,
      outOfStock: item.currentStock === 0
    };
  } catch (error) {
    console.error("Error fetching inventory by ID:", error);
    return null;
  }
}

// Get all products for dropdown
export async function getProductsForInventory() {
  try {
    const result = await db
      .select({
        id: products.id,
        name: products.name,
        sku: products.sku,
        buyPrice: products.buyPrice,
        sellPrice: products.sellPrice,
        isActive: products.isActive
      })
      .from(products)
      .where(eq(products.isActive, true))
      .orderBy(products.name);

    return result;
  } catch (error) {
    console.error("Error fetching products for inventory:", error);
    return [];
  }
}

// Create new inventory record
export async function createInventory(data) {
  try {
    const id = crypto.randomUUID();
    const availableStock = data.currentStock - data.reservedStock;

    await db.insert(inventory).values({
      id,
      productId: data.productId,
      currentStock: data.currentStock,
      reservedStock: data.reservedStock,
      minStock: data.minStock
    });

    // Return the created record with product info
    return await getInventoryById(id);
  } catch (error) {
    console.error("Error creating inventory:", error);
    throw error;
  }
}

// Update inventory record
export async function updateInventory(id, data) {
  try {
    await db
      .update(inventory)
      .set({
        productId: data.productId,
        currentStock: data.currentStock,
        reservedStock: data.reservedStock,
        minStock: data.minStock,
        updatedAt: new Date()
      })
      .where(eq(inventory.id, id));

    // Return the updated record with product info
    return await getInventoryById(id);
  } catch (error) {
    console.error("Error updating inventory:", error);
    throw error;
  }
}

// Delete inventory record
export async function deleteInventory(id) {
  try {
    await db.delete(inventory).where(eq(inventory.id, id));
    return true;
  } catch (error) {
    console.error("Error deleting inventory:", error);
    throw error;
  }
}

// Update stock levels (e.g., when orders are placed or cancelled)
export async function updateStockLevels(productId, currentStock, reservedStock) {
  try {
    const existingInventory = await db
      .select()
      .from(inventory)
      .where(eq(inventory.productId, productId))
      .limit(1);

    if (existingInventory.length > 0) {
      // Update existing inventory
      await db
        .update(inventory)
        .set({
          currentStock,
          reservedStock,
          updatedAt: new Date()
        })
        .where(eq(inventory.productId, productId));
    } else {
      // Create new inventory record
      await db.insert(inventory).values({
        id: crypto.randomUUID(),
        productId,
        currentStock,
        reservedStock,
        minStock: 10 // Default minimum stock
      });
    }

    return true;
  } catch (error) {
    console.error("Error updating stock levels:", error);
    throw error;
  }
}

// Get low stock items
export async function getLowStockItems() {
  try {
    const result = await db
      .select({
        id: inventory.id,
        productId: inventory.productId,
        currentStock: inventory.currentStock,
        reservedStock: inventory.reservedStock,
        minStock: inventory.minStock,
        availableStock: sql`${inventory.currentStock} - ${inventory.reservedStock}`,
        product: {
          id: products.id,
          name: products.name,
          sku: products.sku
        }
      })
      .from(inventory)
      .leftJoin(products, eq(inventory.productId, products.id))
      .where(sql`${inventory.currentStock} - ${inventory.reservedStock} <= ${inventory.minStock}`)
      .orderBy(sql`${inventory.currentStock} - ${inventory.reservedStock}`);

    return result.map(item => ({
      ...item,
      availableStock: Number(item.availableStock),
      lowStockThreshold: true,
      outOfStock: item.currentStock === 0
    }));
  } catch (error) {
    console.error("Error fetching low stock items:", error);
    return [];
  }
}
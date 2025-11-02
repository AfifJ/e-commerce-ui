"use server";

import { db, schema } from '@/db';
import { eq, desc, like, or, sql, count, sum, avg } from 'drizzle-orm';

// Get all vendor users with performance metrics
export async function getVendors(search = '', page = 1, limit = 10) {
  try {
    const offset = (page - 1) * limit;

    // Base query for vendor users with performance metrics
    let query = db.select({
      // User fields
      id: schema.users.id,
      username: schema.users.username,
      email: schema.users.email,
      emailVerified: schema.users.emailVerified,
      name: schema.users.name,
      phone: schema.users.phone,
      phoneVerified: schema.users.phoneVerified,
      verificationCode: schema.users.verificationCode,
      image: schema.users.image,
      role: schema.users.role,
      isActive: schema.users.isActive,
      lastLogin: schema.users.lastLogin,
      currentHotelId: schema.users.currentHotelId,
      createdAt: schema.users.createdAt,
      updatedAt: schema.users.updatedAt,

      // Performance metrics from products
      totalProducts: count(schema.products.id).mapWith(Number),
      activeProducts: sql`SUM(CASE WHEN ${schema.products.isActive} = true THEN 1 ELSE 0 END)`.mapWith(Number),
      featuredProducts: sql`SUM(CASE WHEN ${schema.products.isFeatured} = true THEN 1 ELSE 0 END)`.mapWith(Number),

      // Average rating from product reviews with proper casting
      averageRating: sql`COALESCE(AVG(CAST(${schema.productReviews.rating} AS DECIMAL(2,1))), 0)`.mapWith(Number),
      totalReviews: count(schema.productReviews.id).mapWith(Number),

      // Revenue metrics (using estimated value from inventory)
      estimatedValue: sql`COALESCE(SUM(CAST(${schema.products.sellPrice} AS DECIMAL(15,2)) * COALESCE(${schema.inventory.currentStock}, 0)), 0)`.mapWith(Number),

      // Additional revenue alias for compatibility
      totalRevenue: sql`COALESCE(SUM(CAST(${schema.products.sellPrice} AS DECIMAL(15,2)) * COALESCE(${schema.inventory.currentStock}, 0)), 0)`.mapWith(Number),

      // Business metrics with NULL safety
      outOfStockProducts: sql`SUM(CASE WHEN COALESCE(${schema.inventory.currentStock}, 0) <= 0 THEN 1 ELSE 0 END)`.mapWith(Number),
      lowStockProducts: sql`SUM(CASE WHEN COALESCE(${schema.inventory.currentStock}, 0) <= COALESCE(${schema.inventory.minStock}, 0) AND COALESCE(${schema.inventory.currentStock}, 0) > 0 THEN 1 ELSE 0 END)`.mapWith(Number),

      // Order metrics (placeholder for future integration)
      totalOrders: sql`0`.mapWith(Number)
    })
    .from(schema.users)
    .leftJoin(schema.products, eq(schema.users.id, schema.products.vendorId))
    .leftJoin(schema.productReviews, eq(schema.products.id, schema.productReviews.productId))
    .leftJoin(schema.inventory, eq(schema.products.id, schema.inventory.productId))
    .where(eq(schema.users.role, 'vendor'));

    // Add search filter if provided
    if (search) {
      query = query.where(
        or(
          like(schema.users.name, `%${search}%`),
          like(schema.users.email, `%${search}%`),
          like(schema.users.username, `%${search}%`),
          like(schema.users.phone, `%${search}%`)
        )
      );
    }

    // Group by user fields and order
    query = query.groupBy(schema.users.id)
      .orderBy(desc(schema.users.createdAt));

    // Get total count for pagination
    const countQuery = db.select({ count: count() })
      .from(schema.users)
      .where(eq(schema.users.role, 'vendor'));

    if (search) {
      countQuery.where(
        or(
          like(schema.users.name, `%${search}%`),
          like(schema.users.email, `%${search}%`),
          like(schema.users.username, `%${search}%`),
          like(schema.users.phone, `%${search}%`)
        )
      );
    }

    const [vendors, totalResult] = await Promise.all([
      query.limit(limit).offset(offset),
      countQuery
    ]);

    const total = totalResult[0]?.count || 0;

    return {
      success: true,
      data: vendors,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  } catch (error) {
    console.error('Error fetching vendors:', error);
    return {
      success: false,
      error: error.message,
      data: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 0 }
    };
  }
}

// Get vendor user by ID
export async function getVendorById(id) {
  try {
    const vendor = await db.select({
      // User fields
      id: schema.users.id,
      username: schema.users.username,
      email: schema.users.email,
      emailVerified: schema.users.emailVerified,
      name: schema.users.name,
      phone: schema.users.phone,
      phoneVerified: schema.users.phoneVerified,
      verificationCode: schema.users.verificationCode,
      image: schema.users.image,
      role: schema.users.role,
      isActive: schema.users.isActive,
      lastLogin: schema.users.lastLogin,
      currentHotelId: schema.users.currentHotelId,
      createdAt: schema.users.createdAt,
      updatedAt: schema.users.updatedAt,

      // Performance metrics
      totalProducts: count(schema.products.id).mapWith(Number),
      activeProducts: sql`SUM(CASE WHEN ${schema.products.isActive} = true THEN 1 ELSE 0 END)`.mapWith(Number),
      featuredProducts: sql`SUM(CASE WHEN ${schema.products.isFeatured} = true THEN 1 ELSE 0 END)`.mapWith(Number),

      // Average rating from product reviews
      averageRating: sql`COALESCE(AVG(${schema.productReviews.rating}), 0)`.mapWith(Number),
      totalReviews: count(schema.productReviews.id).mapWith(Number),

      // Revenue metrics
      estimatedValue: sql`COALESCE(SUM(CAST(${schema.products.sellPrice} AS DECIMAL(15,2)) * ${schema.inventory.currentStock}), 0)`.mapWith(Number),

      // Business metrics
      outOfStockProducts: sql`SUM(CASE WHEN ${schema.inventory.currentStock} <= 0 THEN 1 ELSE 0 END)`.mapWith(Number),
      lowStockProducts: sql`SUM(CASE WHEN ${schema.inventory.currentStock} <= ${schema.inventory.minStock} AND ${schema.inventory.currentStock} > 0 THEN 1 ELSE 0 END)`.mapWith(Number)
    })
    .from(schema.users)
    .leftJoin(schema.products, eq(schema.users.id, schema.products.vendorId))
    .leftJoin(schema.productReviews, eq(schema.products.id, schema.productReviews.productId))
    .leftJoin(schema.inventory, eq(schema.products.id, schema.inventory.productId))
    .where(eq(schema.users.id, id))
    .where(eq(schema.users.role, 'vendor'))
    .groupBy(schema.users.id)
    .limit(1);

    if (vendor.length === 0) {
      return { success: false, error: 'Vendor user not found' };
    }

    return { success: true, data: vendor[0] };
  } catch (error) {
    console.error('Error fetching vendor user:', error);
    return { success: false, error: error.message };
  }
}

// Create new vendor user
export async function createVendor(vendorData) {
  try {
    // Validate required fields
    if (!vendorData.username || !vendorData.name || !vendorData.email || !vendorData.phone) {
      return { success: false, error: 'Username, name, email, and phone are required' };
    }

    const id = crypto.randomUUID();
    const newVendor = {
      id,
      username: vendorData.username,
      name: vendorData.name,
      email: vendorData.email,
      phone: vendorData.phone,
      emailVerified: vendorData.emailVerified || false,
      phoneVerified: vendorData.phoneVerified || false,
      verificationCode: vendorData.verificationCode || null,
      image: vendorData.image || null,
      role: 'vendor',
      isActive: vendorData.isActive ?? true,
      lastLogin: vendorData.lastLogin || null,
      currentHotelId: vendorData.currentHotelId || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await db.insert(schema.users).values(newVendor);

    const createdVendor = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id))
      .limit(1);

    return { success: true, data: createdVendor[0] };
  } catch (error) {
    console.error('Error creating vendor user:', error);
    return { success: false, error: error.message };
  }
}

// Update vendor user
export async function updateVendor(id, vendorData) {
  try {
    const existingVendor = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id))
      .where(eq(schema.users.role, 'vendor'))
      .limit(1);

    if (!existingVendor || existingVendor.length === 0) {
      return { success: false, error: 'Vendor user not found' };
    }

    const updateData = {
      username: vendorData.username,
      name: vendorData.name,
      email: vendorData.email,
      phone: vendorData.phone,
      emailVerified: vendorData.emailVerified ?? false,
      phoneVerified: vendorData.phoneVerified ?? false,
      verificationCode: vendorData.verificationCode || null,
      image: vendorData.image || null,
      isActive: vendorData.isActive ?? true,
      currentHotelId: vendorData.currentHotelId || null,
      updatedAt: new Date()
    };

    await db
      .update(schema.users)
      .set(updateData)
      .where(eq(schema.users.id, id));

    const updatedVendor = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id))
      .limit(1);

    if (!updatedVendor || updatedVendor.length === 0) {
      return { success: false, error: 'Vendor user not found after update' };
    }

    return { success: true, data: updatedVendor[0] };
  } catch (error) {
    console.error('Error updating vendor user:', error);
    return { success: false, error: error.message };
  }
}

// Delete vendor user
export async function deleteVendor(id) {
  try {
    const vendorToDelete = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id))
      .where(eq(schema.users.role, 'vendor'))
      .limit(1);

    if (!vendorToDelete || vendorToDelete.length === 0) {
      return { success: false, error: 'Vendor user not found' };
    }

    // Check if vendor has associated products
    const productCount = await db
      .select({ count: count() })
      .from(schema.products)
      .where(eq(schema.products.vendorId, id));

    if (productCount[0]?.count > 0) {
      return {
        success: false,
        error: `Cannot delete vendor. Vendor has ${productCount[0].count} associated products. Please delete or reassign products first.`
      };
    }

    await db
      .delete(schema.users)
      .where(eq(schema.users.id, id));

    return { success: true, data: vendorToDelete[0] };
  } catch (error) {
    console.error('Error deleting vendor user:', error);
    return { success: false, error: error.message };
  }
}

// Toggle vendor user active status
export async function toggleVendorStatus(id) {
  try {
    const vendorResult = await db
      .select({ isActive: schema.users.isActive })
      .from(schema.users)
      .where(eq(schema.users.id, id))
      .where(eq(schema.users.role, 'vendor'))
      .limit(1);

    if (!vendorResult || vendorResult.length === 0) {
      return { success: false, error: 'Vendor user not found' };
    }

    const vendor = vendorResult[0];
    const newStatus = !vendor.isActive;

    await db
      .update(schema.users)
      .set({
        isActive: newStatus,
        updatedAt: new Date()
      })
      .where(eq(schema.users.id, id));

    const updatedVendor = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id))
      .limit(1);

    return { success: true, data: updatedVendor[0] };
  } catch (error) {
    console.error('Error toggling vendor user status:', error);
    return { success: false, error: error.message };
  }
}

// Get vendor products data for a specific vendor
export async function getVendorProducts(vendorId) {
  try {
    const products = await db.select({
      id: schema.products.id,
      name: schema.products.name,
      sku: schema.products.sku,
      buyPrice: schema.products.buyPrice,
      sellPrice: schema.products.sellPrice,
      isActive: schema.products.isActive,
      isFeatured: schema.products.isFeatured,
      currentStock: schema.inventory.currentStock,
      minStock: schema.inventory.minStock,
      categoryName: schema.categories.name,
      reviewCount: count(schema.productReviews.id).mapWith(Number),
      averageRating: sql`COALESCE(AVG(${schema.productReviews.rating}), 0)`.mapWith(Number)
    })
    .from(schema.products)
    .leftJoin(schema.inventory, eq(schema.products.id, schema.inventory.productId))
    .leftJoin(schema.categories, eq(schema.products.categoryId, schema.categories.id))
    .leftJoin(schema.productReviews, eq(schema.products.id, schema.productReviews.productId))
    .where(eq(schema.products.vendorId, vendorId))
    .groupBy(schema.products.id, schema.categories.name, schema.inventory.currentStock, schema.inventory.minStock)
    .orderBy(schema.products.name);

    return { success: true, data: products };
  } catch (error) {
    console.error('Error fetching vendor products:', error);
    return { success: false, error: error.message, data: [] };
  }
}

// Get vendor performance analytics
export async function getVendorAnalytics(vendorId) {
  try {
    const analytics = await db.select({
      totalProducts: count(schema.products.id).mapWith(Number),
      activeProducts: sql`SUM(CASE WHEN ${schema.products.isActive} = true THEN 1 ELSE 0 END)`.mapWith(Number),
      featuredProducts: sql`SUM(CASE WHEN ${schema.products.isFeatured} = true THEN 1 ELSE 0 END)`.mapWith(Number),
      totalStock: sum(schema.inventory.currentStock).mapWith(Number),
      totalValue: sql`COALESCE(SUM(CAST(${schema.products.sellPrice} AS DECIMAL(15,2)) * ${schema.inventory.currentStock}), 0)`.mapWith(Number),
      averageRating: sql`COALESCE(AVG(${schema.productReviews.rating}), 0)`.mapWith(Number),
      totalReviews: count(schema.productReviews.id).mapWith(Number),
      outOfStockProducts: sql`SUM(CASE WHEN ${schema.inventory.currentStock} <= 0 THEN 1 ELSE 0 END)`.mapWith(Number),
      lowStockProducts: sql`SUM(CASE WHEN ${schema.inventory.currentStock} <= ${schema.inventory.minStock} AND ${schema.inventory.currentStock} > 0 THEN 1 ELSE 0 END)`.mapWith(Number)
    })
    .from(schema.products)
    .leftJoin(schema.inventory, eq(schema.products.id, schema.inventory.productId))
    .leftJoin(schema.productReviews, eq(schema.products.id, schema.productReviews.productId))
    .where(eq(schema.products.vendorId, vendorId))
    .limit(1);

    return { success: true, data: analytics[0] || {} };
  } catch (error) {
    console.error('Error fetching vendor analytics:', error);
    return { success: false, error: error.message, data: {} };
  }
}

// Get vendors by role (specifically for vendor role)
export async function getVendorsByRole() {
  try {
    const vendors = await db.select({
      id: schema.users.id,
      username: schema.users.username,
      name: schema.users.name,
      email: schema.users.email,
      phone: schema.users.phone,
      isActive: schema.users.isActive,
      currentHotelId: schema.users.currentHotelId
    })
    .from(schema.users)
    .where(eq(schema.users.role, 'vendor'))
    .orderBy(schema.users.name);

    return { success: true, data: vendors };
  } catch (error) {
    console.error('Error fetching vendors by role:', error);
    return { success: false, error: error.message, data: [] };
  }
}
"use server";

import { db, schema } from '@/db';
import { eq, desc, like, or, sql, count, sum } from 'drizzle-orm';

// Get all sales users with performance metrics
export async function getSales(search = '', page = 1, limit = 10) {
  try {
    const offset = (page - 1) * limit;

    // Base query for sales users with performance metrics
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

      // Performance metrics
      totalTransactions: count(schema.salesTransactions.id).mapWith(Number),
      totalRevenue: sql`COALESCE(SUM(CAST(${schema.salesTransactions.totalAmount} AS DECIMAL(10,2))), 0)`.mapWith(Number),
      totalCommission: sql`COALESCE(SUM(CAST(${schema.salesTransactions.commissionAmount} AS DECIMAL(10,2))), 0)`.mapWith(Number),
      pendingTransactions: sql`SUM(CASE WHEN ${schema.salesTransactions.status} = 'pending' THEN 1 ELSE 0 END)`.mapWith(Number),

      // Borrow metrics
      borrowedProducts: sql`COALESCE(SUM(${schema.salesBorrows.borrowQuantity}), 0)`.mapWith(Number),
      returnedProducts: sql`COALESCE(SUM(${schema.salesBorrows.returnedQuantity}), 0)`.mapWith(Number),
      pendingBorrows: sql`SUM(CASE WHEN ${schema.salesBorrows.status} = 'borrowed' THEN 1 ELSE 0 END)`.mapWith(Number)
    })
    .from(schema.users)
    .leftJoin(schema.salesTransactions, eq(schema.users.id, schema.salesTransactions.salesId))
    .leftJoin(schema.salesBorrows, eq(schema.users.id, schema.salesBorrows.salesId))
    .where(eq(schema.users.role, 'sales'));

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
      .where(eq(schema.users.role, 'sales'));

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

    const [sales, totalResult] = await Promise.all([
      query.limit(limit).offset(offset),
      countQuery
    ]);

    const total = totalResult[0]?.count || 0;

    return {
      success: true,
      data: sales,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  } catch (error) {
    console.error('Error fetching sales:', error);
    return {
      success: false,
      error: error.message,
      data: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 0 }
    };
  }
}

// Get sales user by ID
export async function getSalesById(id) {
  try {
    const sales = await db.select({
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
      totalTransactions: count(schema.salesTransactions.id).mapWith(Number),
      totalRevenue: sql`COALESCE(SUM(CAST(${schema.salesTransactions.totalAmount} AS DECIMAL(10,2))), 0)`.mapWith(Number),
      totalCommission: sql`COALESCE(SUM(CAST(${schema.salesTransactions.commissionAmount} AS DECIMAL(10,2))), 0)`.mapWith(Number),
      pendingTransactions: sql`SUM(CASE WHEN ${schema.salesTransactions.status} = 'pending' THEN 1 ELSE 0 END)`.mapWith(Number),

      // Borrow metrics
      borrowedProducts: sql`COALESCE(SUM(${schema.salesBorrows.borrowQuantity}), 0)`.mapWith(Number),
      returnedProducts: sql`COALESCE(SUM(${schema.salesBorrows.returnedQuantity}), 0)`.mapWith(Number),
      pendingBorrows: sql`SUM(CASE WHEN ${schema.salesBorrows.status} = 'borrowed' THEN 1 ELSE 0 END)`.mapWith(Number)
    })
    .from(schema.users)
    .leftJoin(schema.salesTransactions, eq(schema.users.id, schema.salesTransactions.salesId))
    .leftJoin(schema.salesBorrows, eq(schema.users.id, schema.salesBorrows.salesId))
    .where(eq(schema.users.id, id))
    .where(eq(schema.users.role, 'sales'))
    .groupBy(schema.users.id)
    .limit(1);

    if (sales.length === 0) {
      return { success: false, error: 'Sales user not found' };
    }

    return { success: true, data: sales[0] };
  } catch (error) {
    console.error('Error fetching sales user:', error);
    return { success: false, error: error.message };
  }
}

// Create new sales user
export async function createSales(salesData) {
  try {
    // Validate required fields
    if (!salesData.username || !salesData.name || !salesData.email || !salesData.phone) {
      return { success: false, error: 'Username, name, email, and phone are required' };
    }

    const id = crypto.randomUUID();
    const newSales = {
      id,
      username: salesData.username,
      name: salesData.name,
      email: salesData.email,
      phone: salesData.phone,
      emailVerified: salesData.emailVerified || false,
      phoneVerified: salesData.phoneVerified || false,
      verificationCode: salesData.verificationCode || null,
      image: salesData.image || null,
      role: 'sales',
      isActive: salesData.isActive ?? true,
      lastLogin: salesData.lastLogin || null,
      currentHotelId: salesData.currentHotelId || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await db.insert(schema.users).values(newSales);

    const createdSales = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id))
      .limit(1);

    return { success: true, data: createdSales[0] };
  } catch (error) {
    console.error('Error creating sales user:', error);
    return { success: false, error: error.message };
  }
}

// Update sales user
export async function updateSales(id, salesData) {
  try {
    const existingSales = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id))
      .where(eq(schema.users.role, 'sales'))
      .limit(1);

    if (!existingSales || existingSales.length === 0) {
      return { success: false, error: 'Sales user not found' };
    }

    const updateData = {
      username: salesData.username,
      name: salesData.name,
      email: salesData.email,
      phone: salesData.phone,
      emailVerified: salesData.emailVerified ?? false,
      phoneVerified: salesData.phoneVerified ?? false,
      verificationCode: salesData.verificationCode || null,
      image: salesData.image || null,
      isActive: salesData.isActive ?? true,
      currentHotelId: salesData.currentHotelId || null,
      updatedAt: new Date()
    };

    await db
      .update(schema.users)
      .set(updateData)
      .where(eq(schema.users.id, id));

    const updatedSales = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id))
      .limit(1);

    if (!updatedSales || updatedSales.length === 0) {
      return { success: false, error: 'Sales user not found after update' };
    }

    return { success: true, data: updatedSales[0] };
  } catch (error) {
    console.error('Error updating sales user:', error);
    return { success: false, error: error.message };
  }
}

// Delete sales user
export async function deleteSales(id) {
  try {
    const salesToDelete = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id))
      .where(eq(schema.users.role, 'sales'))
      .limit(1);

    if (!salesToDelete || salesToDelete.length === 0) {
      return { success: false, error: 'Sales user not found' };
    }

    await db
      .delete(schema.users)
      .where(eq(schema.users.id, id));

    return { success: true, data: salesToDelete[0] };
  } catch (error) {
    console.error('Error deleting sales user:', error);
    return { success: false, error: error.message };
  }
}

// Toggle sales user active status
export async function toggleSalesStatus(id) {
  try {
    const salesResult = await db
      .select({ isActive: schema.users.isActive })
      .from(schema.users)
      .where(eq(schema.users.id, id))
      .where(eq(schema.users.role, 'sales'))
      .limit(1);

    if (!salesResult || salesResult.length === 0) {
      return { success: false, error: 'Sales user not found' };
    }

    const sales = salesResult[0];
    const newStatus = !sales.isActive;

    await db
      .update(schema.users)
      .set({
        isActive: newStatus,
        updatedAt: new Date()
      })
      .where(eq(schema.users.id, id));

    const updatedSales = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id))
      .limit(1);

    return { success: true, data: updatedSales[0] };
  } catch (error) {
    console.error('Error toggling sales user status:', error);
    return { success: false, error: error.message };
  }
}

// Get sales performance data for a specific sales user
export async function getSalesPerformance(salesId) {
  try {
    const performance = await db.select({
      totalTransactions: count(schema.salesTransactions.id).mapWith(Number),
      totalRevenue: sql`COALESCE(SUM(CAST(${schema.salesTransactions.totalAmount} AS DECIMAL(10,2))), 0)`.mapWith(Number),
      totalCommission: sql`COALESCE(SUM(CAST(${schema.salesTransactions.commissionAmount} AS DECIMAL(10,2))), 0)`.mapWith(Number),
      pendingTransactions: sql`SUM(CASE WHEN ${schema.salesTransactions.status} = 'pending' THEN 1 ELSE 0 END)`.mapWith(Number),
      confirmedTransactions: sql`SUM(CASE WHEN ${schema.salesTransactions.status} = 'confirmed' THEN 1 ELSE 0 END)`.mapWith(Number),
      cancelledTransactions: sql`SUM(CASE WHEN ${schema.salesTransactions.status} = 'cancelled' THEN 1 ELSE 0 END)`.mapWith(Number),
    })
    .from(schema.salesTransactions)
    .where(eq(schema.salesTransactions.salesId, salesId))
    .limit(1);

    return { success: true, data: performance[0] || {} };
  } catch (error) {
    console.error('Error fetching sales performance:', error);
    return { success: false, error: error.message, data: {} };
  }
}

// Get sales borrow data for a specific sales user
export async function getSalesBorrows(salesId) {
  try {
    const borrows = await db.select({
      totalBorrowed: sql`COALESCE(SUM(${schema.salesBorrows.borrowQuantity}), 0)`.mapWith(Number),
      totalReturned: sql`COALESCE(SUM(${schema.salesBorrows.returnedQuantity}), 0)`.mapWith(Number),
      pendingBorrows: sql`SUM(CASE WHEN ${schema.salesBorrows.status} = 'borrowed' THEN 1 ELSE 0 END)`.mapWith(Number),
      completedBorrows: sql`SUM(CASE WHEN ${schema.salesBorrows.status} = 'returned' THEN 1 ELSE 0 END)`.mapWith(Number),
    })
    .from(schema.salesBorrows)
    .where(eq(schema.salesBorrows.salesId, salesId))
    .limit(1);

    return { success: true, data: borrows[0] || {} };
  } catch (error) {
    console.error('Error fetching sales borrows:', error);
    return { success: false, error: error.message, data: {} };
  }
}

// Get sales users by role (specifically for sales role)
export async function getSalesByRole() {
  try {
    const sales = await db.select({
      id: schema.users.id,
      username: schema.users.username,
      name: schema.users.name,
      email: schema.users.email,
      phone: schema.users.phone,
      isActive: schema.users.isActive,
      currentHotelId: schema.users.currentHotelId
    })
    .from(schema.users)
    .where(eq(schema.users.role, 'sales'))
    .orderBy(schema.users.name);

    return { success: true, data: sales };
  } catch (error) {
    console.error('Error fetching sales by role:', error);
    return { success: false, error: error.message, data: [] };
  }
}
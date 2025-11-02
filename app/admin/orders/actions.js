"use server";

import { db } from '@/db';
import {
  orders,
  orderItems,
  orderStatusHistory,
  users,
  products,
  hotels,
  payments,
  paymentMethods
} from '@/db/schema';
import { eq, desc, like, or, sql, count, isNotNull, isNull } from 'drizzle-orm';

// Get all orders with related data
export async function getOrders(search = '', page = 1, limit = 10, statusFilter = 'all') {
  try {
    const offset = (page - 1) * limit;

    // Base query for orders with related data
    let query = db.select({
      // Order fields
      id: orders.id,
      orderNumber: orders.orderNumber,
      userId: orders.userId,
      status: orders.status,
      subtotal: orders.subtotal,
      taxAmount: orders.taxAmount,
      shippingCost: orders.shippingCost,
      discountAmount: orders.discountAmount,
      totalAmount: orders.totalAmount,
      hotelCommission: orders.hotelCommission,
      salesCommission: orders.salesCommission,
      notes: orders.notes,
      cancellationReason: orders.cancellationReason,
      shippingAddress: orders.shippingAddress,
      createdAt: orders.createdAt,
      updatedAt: orders.updatedAt,

      // Related data
      userName: sql`customer_users.name`.mapWith(String),
      userEmail: sql`customer_users.email`.mapWith(String),
      userPhone: sql`customer_users.phone`.mapWith(String),
      hotelName: sql`hotels.name`.mapWith(String),
      salesName: sql`sales_users.name`.mapWith(String),
      salesEmail: sql`sales_users.email`.mapWith(String),

      // Payment information
      paymentId: payments.id,
      paymentMethod: payments.paymentMethod,
      paymentStatus: payments.status,
      paymentGateway: payments.paymentGateway,
      paidAt: payments.paidAt,

      // Item count
      itemCount: count(orderItems.id).mapWith(Number)
    })
    .from(orders)
    .leftJoin(users.as('customer_users'), eq(orders.userId, sql`customer_users.id`))
    .leftJoin(hotels, eq(orders.hotelId, hotels.id))
    .leftJoin(users.as('sales_users'), eq(orders.salesId, sql`sales_users.id`))
    .leftJoin(payments, eq(orders.id, payments.orderId))
    .leftJoin(orderItems, eq(orders.id, orderItems.orderId));

    // Add search filter if provided
    if (search) {
      query = query.where(
        or(
          like(orders.orderNumber, `%${search}%`),
          like(sql`customer_users.name`, `%${search}%`),
          like(sql`customer_users.email`, `%${search}%`),
          like(sql`sales_users.name`, `%${search}%`),
          like(sql`hotels.name`, `%${search}%`),
          like(orders.shippingAddress, `%${search}%`)
        )
      );
    }

    // Add status filter if provided
    if (statusFilter !== 'all') {
      query = query.where(eq(orders.status, statusFilter));
    }

    // Group by order fields and order
    query = query.groupBy(
      orders.id,
      sql`customer_users.name`,
      sql`customer_users.email`,
      sql`customer_users.phone`,
      sql`hotels.name`,
      sql`sales_users.name`,
      sql`sales_users.email`,
      payments.id,
      payments.paymentMethod,
      payments.status,
      payments.paymentGateway,
      payments.paidAt
    ).orderBy(desc(orders.createdAt));

    // Get total count for pagination
    let countQuery = db.select({ count: count() })
      .from(orders)
      .leftJoin(users.as('customer_users'), eq(orders.userId, sql`customer_users.id`))
      .leftJoin(hotels, eq(orders.hotelId, hotels.id))
      .leftJoin(users.as('sales_users'), eq(orders.salesId, sql`sales_users.id`));

    if (search) {
      countQuery = countQuery.where(
        or(
          like(orders.orderNumber, `%${search}%`),
          like(sql`customer_users.name`, `%${search}%`),
          like(sql`customer_users.email`, `%${search}%`),
          like(sql`sales_users.name`, `%${search}%`),
          like(sql`hotels.name`, `%${search}%`),
          like(orders.shippingAddress, `%${search}%`)
        )
      );
    }

    if (statusFilter !== 'all') {
      countQuery = countQuery.where(eq(orders.status, statusFilter));
    }

    const [ordersData, totalResult] = await Promise.all([
      query.limit(limit).offset(offset),
      countQuery
    ]);

    const total = totalResult[0]?.count || 0;

    return {
      success: true,
      data: ordersData,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return {
      success: false,
      error: error.message,
      data: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 0 }
    };
  }
}

// Get order by ID with complete details
export async function getOrderById(id) {
  try {
    const order = await db.select({
      // Order fields
      id: orders.id,
      orderNumber: orders.orderNumber,
      userId: orders.userId,
      hotelId: orders.hotelId,
      salesId: orders.salesId,
      status: orders.status,
      subtotal: orders.subtotal,
      taxAmount: orders.taxAmount,
      shippingCost: orders.shippingCost,
      discountAmount: orders.discountAmount,
      totalAmount: orders.totalAmount,
      hotelCommission: orders.hotelCommission,
      salesCommission: orders.salesCommission,
      notes: orders.notes,
      cancellationReason: orders.cancellationReason,
      shippingAddress: orders.shippingAddress,
      createdAt: orders.createdAt,
      updatedAt: orders.updatedAt,

      // Related data
      userName: sql`customer_users.name`.mapWith(String),
      userEmail: sql`customer_users.email`.mapWith(String),
      userPhone: sql`customer_users.phone`.mapWith(String),
      hotelName: sql`hotels.name`.mapWith(String),
      hotelAddress: sql`hotels.address`.mapWith(String),
      salesName: sql`sales_users.name`.mapWith(String),
      salesEmail: sql`sales_users.email`.mapWith(String),
      salesPhone: sql`sales_users.phone`.mapWith(String),

      // Payment information
      paymentId: payments.id,
      paymentMethod: payments.paymentMethod,
      paymentStatus: payments.status,
      paymentGateway: payments.paymentGateway,
      gatewayReference: payments.gatewayReference,
      currency: payments.currency,
      paidAt: payments.paidAt,
      qrCodeUrl: payments.qrCodeUrl,
      proofImage: payments.proofImage,
      adminVerified: payments.adminVerified,
      verifiedAt: payments.verifiedAt
    })
    .from(orders)
    .leftJoin(users.as('customer_users'), eq(orders.userId, sql`customer_users.id`))
    .leftJoin(hotels, eq(orders.hotelId, hotels.id))
    .leftJoin(users.as('sales_users'), eq(orders.salesId, sql`sales_users.id`))
    .leftJoin(payments, eq(orders.id, payments.orderId))
    .where(eq(orders.id, id))
    .limit(1);

    if (order.length === 0) {
      return { success: false, error: 'Order not found' };
    }

    return { success: true, data: order[0] };
  } catch (error) {
    console.error('Error fetching order:', error);
    return { success: false, error: error.message };
  }
}

// Get order items for a specific order
export async function getOrderItems(orderId) {
  try {
    const items = await db.select({
      // Item fields
      id: orderItems.id,
      orderId: orderItems.orderId,
      productId: orderItems.productId,
      productName: orderItems.productName,
      quantity: orderItems.quantity,
      unitPrice: orderItems.unitPrice,
      totalPrice: orderItems.totalPrice,
      createdAt: orderItems.createdAt,

      // Related data
      productImage: sql`products.images`.mapWith(String),
      productSku: sql`products.sku`.mapWith(String),
      vendorName: sql`vendors.name`.mapWith(String),
      vendorEmail: sql`vendors.email`.mapWith(String),
      vendorId: sql`vendors.id`.mapWith(String)
    })
    .from(orderItems)
    .leftJoin(products, eq(orderItems.productId, products.id))
    .leftJoin(users.as('vendors'), eq(sql`vendors.id`, sql`vendors.id`))
    .where(eq(orderItems.orderId, orderId))
    .orderBy(orderItems.createdAt);

    return { success: true, data: items };
  } catch (error) {
    console.error('Error fetching order items:', error);
    return { success: false, error: error.message, data: [] };
  }
}

// Get order status history
export async function getOrderStatusHistory(orderId) {
  try {
    const history = await db.select({
      id: orderStatusHistory.id,
      orderId: orderStatusHistory.orderId,
      fromStatus: orderStatusHistory.fromStatus,
      toStatus: orderStatusHistory.toStatus,
      notes: orderStatusHistory.notes,
      createdAt: orderStatusHistory.createdAt,

      // Creator information
      createdBy: sql`status_users.name`.mapWith(String),
      createdByEmail: sql`status_users.email`.mapWith(String)
    })
    .from(orderStatusHistory)
    .leftJoin(users.as('status_users'), eq(orderStatusHistory.createdBy, sql`status_users.id`))
    .where(eq(orderStatusHistory.orderId, orderId))
    .orderBy(desc(orderStatusHistory.createdAt));

    return { success: true, data: history };
  } catch (error) {
    console.error('Error fetching order status history:', error);
    return { success: false, error: error.message, data: [] };
  }
}

// Update order status
export async function updateOrderStatus(orderId, newStatus, notes = null, userId = null) {
  try {
    // Get current order
    const currentOrder = await db
      .select({ status: orders.status })
      .from(orders)
      .where(eq(orders.id, orderId))
      .limit(1);

    if (!currentOrder || currentOrder.length === 0) {
      return { success: false, error: 'Order not found' };
    }

    const currentStatus = currentOrder[0].status;

    // Don't update if status is the same
    if (currentStatus === newStatus) {
      return { success: false, error: 'Order already has this status' };
    }

    // Validate status transitions
    const validTransitions = {
      'pending': ['confirmed', 'cancelled'],
      'confirmed': ['processing', 'cancelled'],
      'processing': ['shipped', 'cancelled'],
      'shipped': ['delivered', 'cancelled'],
      'delivered': ['refunded'],
      'cancelled': ['refunded'],
      'refunded': []
    };

    if (!validTransitions[currentStatus]?.includes(newStatus)) {
      return {
        success: false,
        error: `Cannot change status from ${currentStatus} to ${newStatus}`
      };
    }

    // Update order status
    await db
      .update(orders)
      .set({
        status: newStatus,
        updatedAt: new Date()
      })
      .where(eq(orders.id, orderId));

    // Create status history record
    await db.insert(orderStatusHistory).values({
      id: crypto.randomUUID(),
      orderId: orderId,
      fromStatus: currentStatus,
      toStatus: newStatus,
      notes: notes,
      createdBy: userId,
      createdAt: new Date()
    });

    // Get updated order
    const updatedOrder = await getOrderById(orderId);

    if (!updatedOrder.success) {
      return { success: false, error: 'Failed to fetch updated order' };
    }

    return {
      success: true,
      data: updatedOrder.data,
      message: `Order status updated from ${currentStatus} to ${newStatus}`
    };
  } catch (error) {
    console.error('Error updating order status:', error);
    return { success: false, error: error.message };
  }
}

// Get order statistics
export async function getOrderStatistics() {
  try {
    const stats = await db.select({
      totalOrders: count(orders.id),
      pendingOrders: count(sql`CASE WHEN ${orders.status} = 'pending' THEN 1 END`),
      confirmedOrders: count(sql`CASE WHEN ${orders.status} = 'confirmed' THEN 1 END`),
      processingOrders: count(sql`CASE WHEN ${orders.status} = 'processing' THEN 1 END`),
      shippedOrders: count(sql`CASE WHEN ${orders.status} = 'shipped' THEN 1 END`),
      deliveredOrders: count(sql`CASE WHEN ${orders.status} = 'delivered' THEN 1 END`),
      cancelledOrders: count(sql`CASE WHEN ${orders.status} = 'cancelled' THEN 1 END`),
      refundedOrders: count(sql`CASE WHEN ${orders.status} = 'refunded' THEN 1 END`),
      totalRevenue: sql`SUM(CAST(${orders.totalAmount} AS DECIMAL(15,2)))`
    })
    .from(orders);

    return { success: true, data: stats[0] || {} };
  } catch (error) {
    console.error('Error fetching order statistics:', error);
    return { success: false, error: error.message, data: {} };
  }
}

// Get available payment methods
export async function getPaymentMethods() {
  try {
    const methods = await db.select({
      id: paymentMethods.id,
      name: paymentMethods.name,
      code: paymentMethods.code,
      type: paymentMethods.type,
      icon: paymentMethods.icon,
      isActive: paymentMethods.isActive
    })
    .from(paymentMethods)
    .where(eq(paymentMethods.isActive, true))
    .orderBy(paymentMethods.sortOrder, paymentMethods.name);

    return { success: true, data: methods };
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    return { success: false, error: error.message, data: [] };
  }
}
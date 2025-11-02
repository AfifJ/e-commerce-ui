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

    // Base query for orders with related data using subqueries
    let query = db.select({
      // Order fields
      id: orders.id,
      orderNumber: orders.orderNumber,
      userId: orders.user_id,
      status: orders.status,
      subtotal: orders.subtotal,
      taxAmount: orders.tax_amount,
      shippingCost: orders.shipping_cost,
      discountAmount: orders.discount_amount,
      totalAmount: orders.total_amount,
      hotelCommission: orders.hotel_commission,
      salesCommission: orders.sales_commission,
      notes: orders.notes,
      cancellationReason: orders.cancellation_reason,
      shippingAddress: orders.shipping_address,
      createdAt: orders.created_at,
      updatedAt: orders.updated_at,

      // Related data using subqueries
      userName: sql`(SELECT name FROM ${users} WHERE ${users}.id = ${orders}.user_id)`.mapWith(String),
      userEmail: sql`(SELECT email FROM ${users} WHERE ${users}.id = ${orders}.user_id)`.mapWith(String),
      hotelName: sql`(SELECT name FROM ${hotels} WHERE ${hotels}.id = ${orders}.hotel_id)`.mapWith(String),
      salesName: sql`(SELECT name FROM ${users} WHERE ${users}.id = ${orders}.sales_id)`.mapWith(String),
      salesEmail: sql`(SELECT email FROM ${users} WHERE ${users}.id = ${orders}.sales_id)`.mapWith(String),

      // Payment information
      paymentId: payments.id,
      paymentMethod: payments.payment_method,
      paymentStatus: payments.status,
      paymentGateway: payments.payment_gateway,
      paidAt: payments.paid_at,

      // Item count
      itemCount: count(orderItems.id).mapWith(Number)
    })
    .from(orders)
    .leftJoin(payments, eq(orders.id, payments.order_id))
    .leftJoin(orderItems, eq(orders.id, orderItems.order_id));

    // Add search filter if provided
    if (search) {
      query = query.where(
        or(
          like(orders.orderNumber, `%${search}%`),
          like(orders.shipping_address, `%${search}%`),
          like(orders.notes, `%${search}%`)
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
      payments.id,
      payments.paymentMethod,
      payments.status,
      payments.paymentGateway,
      payments.paidAt
    ).orderBy(desc(orders.created_at));

    // Get total count for pagination
    let countQuery = db.select({ count: count() })
      .from(orders);

    if (search) {
      countQuery = countQuery.where(
        or(
          like(orders.orderNumber, `%${search}%`),
          like(orders.shipping_address, `%${search}%`),
          like(orders.notes, `%${search}%`)
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
      userId: orders.user_id,
      hotelId: orders.hotel_id,
      salesId: orders.sales_id,
      status: orders.status,
      subtotal: orders.subtotal,
      taxAmount: orders.tax_amount,
      shippingCost: orders.shipping_cost,
      discountAmount: orders.discount_amount,
      totalAmount: orders.total_amount,
      hotelCommission: orders.hotel_commission,
      salesCommission: orders.sales_commission,
      notes: orders.notes,
      cancellationReason: orders.cancellation_reason,
      shippingAddress: orders.shipping_address,
      createdAt: orders.created_at,
      updatedAt: orders.updated_at,

      // Related data using subqueries
      userName: sql`(SELECT name FROM ${users} WHERE ${users}.id = ${orders}.user_id)`.mapWith(String),
      userEmail: sql`(SELECT email FROM ${users} WHERE ${users}.id = ${orders}.user_id)`.mapWith(String),
      hotelName: sql`(SELECT name FROM ${hotels} WHERE ${hotels}.id = ${orders}.hotel_id)`.mapWith(String),
      hotelAddress: sql`(SELECT address FROM ${hotels} WHERE ${hotels}.id = ${orders}.hotel_id)`.mapWith(String),
      salesName: sql`(SELECT name FROM ${users} WHERE ${users}.id = ${orders}.sales_id)`.mapWith(String),
      salesEmail: sql`(SELECT email FROM ${users} WHERE ${users}.id = ${orders}.sales_id)`.mapWith(String),

      // Payment information
      paymentId: payments.id,
      paymentMethod: payments.payment_method,
      paymentStatus: payments.status,
      paymentGateway: payments.payment_gateway,
      gatewayReference: payments.gateway_reference,
      currency: payments.currency,
      paidAt: payments.paid_at,
      qrCodeUrl: payments.qr_code_url,
      proofImage: payments.proof_image,
      adminVerified: payments.admin_verified,
      verifiedAt: payments.verified_at
    })
    .from(orders)
    .leftJoin(payments, eq(orders.id, payments.order_id))
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
      orderId: orderItems.order_id,
      productId: orderItems.product_id,
      productName: orderItems.product_name,
      quantity: orderItems.quantity,
      unitPrice: orderItems.unit_price,
      totalPrice: orderItems.total_price,
      createdAt: orderItems.created_at,

      // Related data
      productImage: sql`products.images`.mapWith(String),
      productSku: sql`products.sku`.mapWith(String),
      vendorName: sql`(SELECT name FROM ${users} WHERE ${users}.id = ${orderItems}.vendor_id)`.mapWith(String),
      vendorEmail: sql`(SELECT email FROM ${users} WHERE ${users}.id = ${orderItems}.vendor_id)`.mapWith(String),
      vendorId: orderItems.vendor_id
    })
    .from(orderItems)
    .leftJoin(products, eq(orderItems.product_id, products.id))
    .where(eq(orderItems.order_id, orderId))
    .orderBy(orderItems.created_at);

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
      orderId: orderStatusHistory.order_id,
      fromStatus: orderStatusHistory.from_status,
      toStatus: orderStatusHistory.to_status,
      notes: orderStatusHistory.notes,
      createdAt: orderStatusHistory.created_at,

      // Creator information
      createdBy: sql`(SELECT name FROM ${users} WHERE ${users}.id = ${orderStatusHistory}.created_by)`.mapWith(String),
      createdByEmail: sql`(SELECT email FROM ${users} WHERE ${users}.id = ${orderStatusHistory}.created_by)`.mapWith(String)
    })
    .from(orderStatusHistory)
    .where(eq(orderStatusHistory.order_id, orderId))
    .orderBy(desc(orderStatusHistory.created_at));

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
        updated_at: new Date()
      })
      .where(eq(orders.id, orderId));

    // Create status history record
    await db.insert(orderStatusHistory).values({
      id: crypto.randomUUID(),
      order_id: orderId,
      from_status: currentStatus,
      to_status: newStatus,
      notes: notes,
      created_by: userId,
      created_at: new Date()
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
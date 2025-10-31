"use server"

import { redirect } from 'next/navigation'
import { validateCheckoutForm, validatePayment, validateOrderId, validateOrderStatus } from '@/lib/schemas/checkout-schema'
import { getCurrentUser, createOrder, getOrderById, processPayment, generateQRIS, updateOrderStatus } from '@/lib/user-service'

/**
 * Server Action untuk membuat order dari checkout form
 */
export async function createOrderAction(formData) {
  // Extract form data
  const rawFormData = {
    kecamatan: formData.get('kecamatan'),
    kotaKabupaten: formData.get('kotaKabupaten'),
    kodePos: formData.get('kodePos'),
    catatan: formData.get('catatan') || ''
  }

  // Validate form data dengan Zod
  const validation = validateCheckoutForm(rawFormData)
  if (!validation.success) {
    return {
      success: false,
      error: 'Validation failed',
      details: validation.error.errors.map(err => ({
        field: err.path[0],
        message: err.message
      }))
    }
  }

  // Get current user data
  const userResult = await getCurrentUser()
  if (!userResult.success) {
    return {
      success: false,
      error: 'User not authenticated',
      details: [{ field: 'auth', message: 'Silakan login terlebih dahulu' }]
    }
  }

  // Get checkout data dari sessionStorage (di client side)
  // Dalam aplikasi nyata, ini akan dikirim dari client
  const checkoutDataJSON = formData.get('checkoutData')
  if (!checkoutDataJSON) {
    return {
      success: false,
      error: 'Missing checkout data',
      details: [{ field: 'cart', message: 'Data keranjang tidak ditemukan' }]
    }
  }

  let checkoutData
  try {
    checkoutData = JSON.parse(checkoutDataJSON)
  } catch (error) {
    return {
      success: false,
      error: 'Invalid checkout data',
      details: [{ field: 'cart', message: 'Data keranjang tidak valid' }]
    }
  }

  // Prepare order data
  const orderData = {
    items: checkoutData.items || [],
    shippingInfo: validation.data,
    shipping: "Kurir Bahana",
    payment: "QRIS",
    subtotal: checkoutData.subtotal || 0,
    shippingCost: checkoutData.shipping || 15000,
    discount: checkoutData.discount || 0,
    total: checkoutData.total || 0
  }

  // Create order
  const orderResult = await createOrder(orderData)
  if (!orderResult.success) {
    return {
      success: false,
      error: 'Failed to create order',
      details: [{ field: 'order', message: orderResult.error }]
    }
  }

  // Redirect ke payment page untuk proses pembayaran QRIS
  redirect(`/payment/${orderResult.data.id}`)
}

/**
 * Server Action untuk memproses pembayaran QRIS
 */
export async function processPaymentAction(formData) {
  try {
    const orderId = formData.get('orderId')
    const paymentMethod = formData.get('paymentMethod') || 'QRIS'
    const amount = parseFloat(formData.get('amount'))

    // Validate input
    const validation = validatePayment({ orderId, paymentMethod, amount })
    if (!validation.success) {
      return {
        success: false,
        error: 'Invalid payment data',
        details: validation.error.errors.map(err => ({
          field: err.path[0],
          message: err.message
        }))
      }
    }

    // Process payment
    const paymentResult = await processPayment(orderId, paymentMethod)
    if (!paymentResult.success) {
      return {
        success: false,
        error: 'Payment failed',
        details: [{ field: 'payment', message: paymentResult.error }]
      }
    }

    // Generate QRIS code
    const qrisResult = await generateQRIS(orderId, amount)
    if (!qrisResult.success) {
      return {
        success: false,
        error: 'QRIS generation failed',
        details: [{ field: 'qris', message: qrisResult.error }]
      }
    }

    return {
      success: true,
      data: {
        order: paymentResult.data,
        qris: qrisResult.data
      }
    }

  } catch (error) {
    console.error('Process payment error:', error)
    return {
      success: false,
      error: 'Server error',
      details: [{ field: 'server', message: 'Terjadi kesalahan server. Silakan coba lagi.' }]
    }
  }
}

/**
 * Server Action untuk mengambil detail order
 */
export async function getOrderDetails(orderId) {
  try {
    // Validate order ID
    const validation = validateOrderId({ orderId })
    if (!validation.success) {
      return {
        success: false,
        error: 'Invalid order ID',
        details: validation.error.errors.map(err => ({
          field: err.path[0],
          message: err.message
        }))
      }
    }

    // Get order details
    const orderResult = await getOrderById(orderId)
    if (!orderResult.success) {
      return {
        success: false,
        error: 'Order not found',
        details: [{ field: 'orderId', message: 'Order tidak ditemukan' }]
      }
    }

    return {
      success: true,
      data: orderResult.data
    }

  } catch (error) {
    console.error('Get order details error:', error)
    return {
      success: false,
      error: 'Server error',
      details: [{ field: 'server', message: 'Terjadi kesalahan server. Silakan coba lagi.' }]
    }
  }
}

/**
 * Server Action untuk update status order
 */
export async function updateOrderStatusAction(formData) {
  try {
    const orderId = formData.get('orderId')
    const status = formData.get('status')
    const trackingNumber = formData.get('trackingNumber') || null

    // Validate input
    const validation = validateOrderStatus({ orderId, status, trackingNumber })
    if (!validation.success) {
      return {
        success: false,
        error: 'Invalid order status data',
        details: validation.error.errors.map(err => ({
          field: err.path[0],
          message: err.message
        }))
      }
    }

    // Update order status
    const updateResult = await updateOrderStatus(orderId, status, trackingNumber)
    if (!updateResult.success) {
      return {
        success: false,
        error: 'Failed to update order status',
        details: [{ field: 'status', message: updateResult.error }]
      }
    }

    return {
      success: true,
      data: updateResult.data
    }

  } catch (error) {
    console.error('Update order status error:', error)
    return {
      success: false,
      error: 'Server error',
      details: [{ field: 'server', message: 'Terjadi kesalahan server. Silakan coba lagi.' }]
    }
  }
}

/**
 * Server Action untuk generate QRIS code
 */
export async function generateQRISAction(formData) {
  try {
    const orderId = formData.get('orderId')
    const amount = parseFloat(formData.get('amount'))

    // Validate input
    const orderIdValidation = validateOrderId({ orderId })
    if (!orderIdValidation.success) {
      return {
        success: false,
        error: 'Invalid order ID',
        details: orderIdValidation.error.errors.map(err => ({
          field: err.path[0],
          message: err.message
        }))
      }
    }

    if (!amount || amount <= 0) {
      return {
        success: false,
        error: 'Invalid amount',
        details: [{ field: 'amount', message: 'Jumlah pembayaran tidak valid' }]
      }
    }

    // Generate QRIS
    const qrisResult = await generateQRIS(orderId, amount)
    if (!qrisResult.success) {
      return {
        success: false,
        error: 'QRIS generation failed',
        details: [{ field: 'qris', message: qrisResult.error }]
      }
    }

    return {
      success: true,
      data: qrisResult.data
    }

  } catch (error) {
    console.error('Generate QRIS error:', error)
    return {
      success: false,
      error: 'Server error',
      details: [{ field: 'server', message: 'Terjadi kesalahan server. Silakan coba lagi.' }]
    }
  }
}

/**
 * Server Action untuk check payment status
 */
export async function checkPaymentStatusAction(orderId) {
  try {
    // Validate order ID
    const validation = validateOrderId({ orderId })
    if (!validation.success) {
      return {
        success: false,
        error: 'Invalid order ID',
        details: validation.error.errors.map(err => ({
          field: err.path[0],
          message: err.message
        }))
      }
    }

    // Get order details
    const orderResult = await getOrderById(orderId)
    if (!orderResult.success) {
      return {
        success: false,
        error: 'Order not found',
        details: [{ field: 'orderId', message: 'Order tidak ditemukan' }]
      }
    }

    const order = orderResult.data

    // Check if payment is still valid (2 hours window)
    if (order.status === 'pending') {
      const createdAt = new Date(order.createdAt)
      const now = new Date()
      const timeDiff = now - createdAt
      const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60))

      if (hoursDiff > 2) {
        // Cancel expired order
        await updateOrderStatus(orderId, 'cancelled')
        return {
          success: true,
          data: {
            status: 'expired',
            message: 'Pembayaran telah kadaluarsa'
          }
        }
      }
    }

    return {
      success: true,
      data: {
        status: order.status,
        order: order
      }
    }

  } catch (error) {
    console.error('Check payment status error:', error)
    return {
      success: false,
      error: 'Server error',
      details: [{ field: 'server', message: 'Terjadi kesalahan server. Silakan coba lagi.' }]
    }
  }
}
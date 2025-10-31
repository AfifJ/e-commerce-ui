import { z } from 'zod'

// Schema untuk checkout form
export const checkoutFormSchema = z.object({
  kecamatan: z
    .string()
    .min(1, 'Kecamatan wajib diisi')
    .min(3, 'Kecamatan minimal 3 karakter')
    .max(50, 'Kecamatan maksimal 50 karakter'),
  kotaKabupaten: z
    .string()
    .min(1, 'Kota/Kabupaten wajib diisi')
    .min(3, 'Kota/Kabupaten minimal 3 karakter')
    .max(50, 'Kota/Kabupaten maksimal 50 karakter'),
  kodePos: z
    .string()
    .length(5, 'Kode pos harus 5 digit')
    .regex(/^\d{5}$/, 'Kode pos hanya boleh angka'),
  catatan: z
    .string()
    .max(500, 'Catatan maksimal 500 karakter')
    .optional()
    .or(z.literal(''))
})

// Schema untuk order creation
export const orderSchema = z.object({
  id: z.string(),
  customerInfo: z.object({
    nama: z.string(),
    whatsapp: z.string(),
    alamat: z.string()
  }),
  items: z.array(z.object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
    variant: z.string(),
    image: z.string().url().optional()
  })),
  shippingInfo: z.object({
    kecamatan: z.string(),
    kotaKabupaten: z.string(),
    kodePos: z.string(),
    catatan: z.string().optional()
  }),
  shipping: z.string(),
  payment: z.string(),
  subtotal: z.number(),
  shippingCost: z.number(),
  discount: z.number(),
  total: z.number(),
  status: z.enum(['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled']),
  createdAt: z.string(),
  updatedAt: z.string()
})

// Schema untuk payment processing
export const paymentSchema = z.object({
  orderId: z.string().min(1, 'Order ID wajib diisi'),
  paymentMethod: z.enum(['QRIS'], {
    errorMap: () => ({ message: 'Metode pembayaran tidak valid' })
  }),
  amount: z.number().positive('Jumlah pembayaran harus positif')
})

// Schema untuk order status update
export const orderStatusSchema = z.object({
  orderId: z.string().min(1, 'Order ID wajib diisi'),
  status: z.enum(['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled']),
  trackingNumber: z.string().optional()
})

// Schema untuk order ID parameter
export const orderIdSchema = z.object({
  orderId: z.string().min(1, 'Order ID wajib diisi')
})

// Export validation functions
export function validateCheckoutForm(data) {
  return checkoutFormSchema.safeParse(data)
}

export function validateOrder(data) {
  return orderSchema.safeParse(data)
}

export function validatePayment(data) {
  return paymentSchema.safeParse(data)
}

export function validateOrderStatus(data) {
  return orderStatusSchema.safeParse(data)
}

export function validateOrderId(data) {
  return orderIdSchema.safeParse(data)
}
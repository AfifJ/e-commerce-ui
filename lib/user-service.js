// Mock user data service untuk simulasi database user

// Mock user database
const mockUsers = [
  {
    id: "user-001",
    nama: "Ahmad Fauzi",
    email: "ahmad.fauzi@email.com",
    whatsapp: "+62 812-3456-7890",
    alamat: "Jl. Merdeka No. 123, RT 001/RW 002, Kelurahan Menteng",
    isVerified: true,
    createdAt: "2024-01-15T00:00:00Z"
  },
  {
    id: "user-002",
    nama: "Siti Nurhaliza",
    email: "siti.nurhaliza@email.com",
    whatsapp: "+62 813-9876-5432",
    alamat: "Jl. Sudirman No. 456, Blok A, No. 12, Kelurahan Senayan",
    isVerified: true,
    createdAt: "2024-02-20T00:00:00Z"
  },
  {
    id: "user-003",
    nama: "Budi Santoso",
    email: "budi.santoso@email.com",
    whatsapp: "+62 811-2233-4455",
    alamat: "Jl. Gatot Subroto No. 789, Tower B, Lt. 5, Kelurahan Karet",
    isVerified: true,
    createdAt: "2024-03-10T00:00:00Z"
  }
]

// Mock orders database - use a global object to persist across requests
if (typeof global.mockOrders === 'undefined') {
  global.mockOrders = [];
}
const mockOrders = global.mockOrders;

// Get current authenticated user ID from Zustand store
const getCurrentUserId = () => {
  // Import auth store secara dynamic untuk avoid circular dependency
  try {
    const { useAuthStore } = require("@/stores/auth-store");
    const state = useAuthStore.getState();
    return state.user?.id || mockUsers[0].id; // Fallback ke user pertama untuk development
  } catch (error) {
    // Fallback ke user pertama jika store tidak tersedia (SSR, dll)
    return mockUsers[0].id;
  }
}

// Get current user data and sync with Zustand store
export async function getCurrentUser() {
  try {
    // Simulasi database delay
    await new Promise(resolve => setTimeout(resolve, 100))

    const userId = getCurrentUserId()
    const user = mockUsers.find(u => u.id === userId)

    if (!user) {
      throw new Error('User not found')
    }

    const userData = {
      id: user.id,
      name: user.nama,
      email: user.email,
      phone: user.whatsapp,
      address: user.alamat,
      isVerified: user.isVerified
    }

    // Sync dengan Zustand store jika tersedia
    try {
      const { useAuthStore } = require("@/stores/auth-store");
      const { updateUser } = useAuthStore.getState();
      updateUser(userData);
    } catch (error) {
      // Ignore jika store tidak tersedia (SSR, dll)
    }

    return {
      success: true,
      data: userData
    }
  } catch (error) {
    console.error('Error getting current user:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Check if user is authenticated
export async function isAuthenticated() {
  try {
    // Simulasi pengecekan auth status
    await new Promise(resolve => setTimeout(resolve, 50))

    // Dalam aplikasi nyata, ini mengecek session/token
    return {
      success: true,
      data: true // Default: user sudah login
    }
  } catch (error) {
    console.error('Error checking authentication:', error)
    return {
      success: false,
      data: false
    }
  }
}

// Update user profile
export async function updateUserProfile(userData) {
  try {
    // Simulasi database delay
    await new Promise(resolve => setTimeout(resolve, 200))

    const userId = getCurrentUserId()
    const userIndex = mockUsers.findIndex(u => u.id === userId)

    if (userIndex === -1) {
      throw new Error('User not found')
    }

    // Update user data (tanpa mengubah ID dan email)
    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      ...userData,
      updatedAt: new Date().toISOString()
    }

    return {
      success: true,
      data: mockUsers[userIndex]
    }
  } catch (error) {
    console.error('Error updating user profile:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Create new order
export async function createOrder(orderData) {
  try {
    // Simulasi database delay
    await new Promise(resolve => setTimeout(resolve, 300))

    const userId = getCurrentUserId()
    const user = mockUsers.find(u => u.id === userId)

    if (!user) {
      throw new Error('User not found')
    }

    // Generate order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 11).toUpperCase()}`

    const newOrder = {
      id: orderId,
      customerInfo: {
        id: user.id,
        nama: user.nama,
        whatsapp: user.whatsapp,
        alamat: user.alamat
      },
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      trackingNumber: null
    }

    // Save to mock database
    mockOrders.push(newOrder)
    console.log('Order created:', newOrder.id, 'Total orders:', mockOrders.length)

    return {
      success: true,
      data: newOrder
    }
  } catch (error) {
    console.error('Error creating order:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Get order by ID
export async function getOrderById(orderId) {
  try {
    // Simulasi database delay
    await new Promise(resolve => setTimeout(resolve, 100))

    console.log('Looking for order:', orderId, 'Available orders:', mockOrders.map(o => o.id))
    const order = mockOrders.find(o => o.id === orderId)

    if (!order) {
      throw new Error('Order not found')
    }

    console.log('Order found:', order.id)
    return {
      success: true,
      data: order
    }
  } catch (error) {
    console.error('Error getting order:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Get all orders for current user
export async function getUserOrders() {
  try {
    // Simulasi database delay
    await new Promise(resolve => setTimeout(resolve, 150))

    const userId = getCurrentUserId()
    const orders = mockOrders.filter(o => o.customerInfo.id === userId)

    // Sort by creation date (newest first)
    orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    return {
      success: true,
      data: orders
    }
  } catch (error) {
    console.error('Error getting user orders:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Update order status
export async function updateOrderStatus(orderId, status, trackingNumber = null) {
  try {
    // Simulasi database delay
    await new Promise(resolve => setTimeout(resolve, 200))

    const orderIndex = mockOrders.findIndex(o => o.id === orderId)

    if (orderIndex === -1) {
      throw new Error('Order not found')
    }

    // Update order
    mockOrders[orderIndex] = {
      ...mockOrders[orderIndex],
      status,
      trackingNumber,
      updatedAt: new Date().toISOString()
    }

    return {
      success: true,
      data: mockOrders[orderIndex]
    }
  } catch (error) {
    console.error('Error updating order status:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Simulate real-time order status updates
export async function simulateOrderStatusUpdate(orderId) {
  try {
    const order = mockOrders.find(o => o.id === orderId)

    if (!order) {
      throw new Error('Order not found')
    }

    // Simulasi progression status
    const statusFlow = ['pending', 'paid', 'processing', 'shipped', 'delivered']
    const currentStatusIndex = statusFlow.indexOf(order.status)

    if (currentStatusIndex < statusFlow.length - 1) {
      const nextStatus = statusFlow[currentStatusIndex + 1]

      // Update status
      await new Promise(resolve => setTimeout(resolve, 2000)) // 2 second delay

      if (nextStatus === 'shipped') {
        // Generate tracking number
        const trackingNumber = `TRK${Date.now()}${Math.random().toString(36).substring(2, 8).toUpperCase()}`
        return await updateOrderStatus(orderId, nextStatus, trackingNumber)
      } else {
        return await updateOrderStatus(orderId, nextStatus)
      }
    }

    return {
      success: true,
      data: order
    }
  } catch (error) {
    console.error('Error simulating order status update:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Mock payment processing
export async function processPayment(orderId, paymentMethod = 'QRIS') {
  try {
    // Simulasi processing delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    const order = mockOrders.find(o => o.id === orderId)

    if (!order) {
      throw new Error('Order not found')
    }

    if (order.status !== 'pending') {
      throw new Error('Order cannot be paid')
    }

    // Update order to paid
    const updatedOrder = await updateOrderStatus(orderId, 'paid')

    return {
      success: true,
      data: {
        ...updatedOrder.data,
        paymentMethod,
        paidAt: new Date().toISOString()
      }
    }
  } catch (error) {
    console.error('Error processing payment:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Generate QRIS code (mock)
export async function generateQRIS(orderId, amount) {
  try {
    // Simulasi QR generation delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Mock QRIS data
    const qrisData = {
      merchantName: 'Premium E-Commerce',
      orderId: orderId,
      amount: amount,
      qrCode: `https://api.qr-generator.com/qr?data=${orderId}-${amount}-${Date.now()}`,
      expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString() // 2 hours
    }

    return {
      success: true,
      data: qrisData
    }
  } catch (error) {
    console.error('Error generating QRIS:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Initialize sample orders for testing
export async function initializeSampleOrders() {
  try {
    const userId = getCurrentUserId()

    // Check if user already has orders
    const existingOrders = mockOrders.filter(o => o.customerInfo.id === userId)

    if (existingOrders.length === 0) {
      // Create sample orders
      const sampleOrders = [
        {
          customerInfo: {
            id: userId,
            nama: mockUsers[0].nama,
            whatsapp: mockUsers[0].whatsapp,
            alamat: mockUsers[0].alamat
          },
          items: [
            {
              id: 1,
              name: "iPhone 15 Pro Max 256GB",
              price: 18499000,
              quantity: 1,
              variant: "Natural Titanium",
              image: "https://images.unsplash.com/photo-1592286115803-a1c3b552ee43?w=100&h=100&fit=crop&crop=center"
            }
          ],
          shippingInfo: {
            kecamatan: "Menteng",
            kotaKabupaten: "Jakarta Pusat",
            kodePos: "10310",
            catatan: "Harap dikirim secepatnya"
          },
          shipping: "Kurir Bahana",
          payment: "QRIS",
          subtotal: 18499000,
          shippingCost: 15000,
          discount: 0,
          total: 18514000,
          status: "delivered"
        },
        {
          customerInfo: {
            id: userId,
            nama: mockUsers[0].nama,
            whatsapp: mockUsers[0].whatsapp,
            alamat: mockUsers[0].alamat
          },
          items: [
            {
              id: 2,
              name: "MacBook Air M2 13-inch",
              price: 15999000,
              quantity: 1,
              variant: "Midnight",
              image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100&h=100&fit=crop&crop=center"
            }
          ],
          shippingInfo: {
            kecamatan: "Menteng",
            kotaKabupaten: "Jakarta Pusat",
            kodePos: "10310",
            catatan: ""
          },
          shipping: "Kurir Bahana",
          payment: "QRIS",
          subtotal: 15999000,
          shippingCost: 15000,
          discount: 0,
          total: 16014000,
          status: "shipped",
          trackingNumber: "TRK20241028001"
        }
      ]

      // Add sample orders
      for (const orderData of sampleOrders) {
        const orderId = `ORD-SAMPLE-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
        const order = {
          id: orderId,
          ...orderData,
          createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date().toISOString()
        }
        mockOrders.push(order)
      }
    }

    return {
      success: true,
      data: 'Sample orders initialized'
    }
  } catch (error) {
    console.error('Error initializing sample orders:', error)
    return {
      success: false,
      error: error.message
    }
  }
}
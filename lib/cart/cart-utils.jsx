// Cart utility functions
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

export const calculateSubtotal = (items) => {
  if (!Array.isArray(items)) return 0;
  return items.reduce((total, item) => total + ((item.price || 0) * (item.quantity || 1)), 0);
};

export const calculateShipping = (subtotal, shippingMethod = 'regular') => {
  // Dummy shipping calculation
  const shippingRates = {
    regular: 15000,
    express: 25000,
    same_day: 45000
  };

  // Free shipping for orders above 500k
  if (subtotal >= 500000) return 0;

  return shippingRates[shippingMethod] || shippingRates.regular;
};

export const calculateTax = (amount) => {
  // Assuming 11% tax (PPN)
  return Math.round(amount * 0.11);
};

export const calculateTotal = (items, shippingMethod = 'regular') => {
  const subtotal = calculateSubtotal(items);
  const shipping = calculateShipping(subtotal, shippingMethod);
  const tax = calculateTax(subtotal);

  return {
    subtotal,
    shipping,
    tax,
    total: subtotal + shipping + tax,
    itemCount: Array.isArray(items) ? items.length : 0
  };
};

export const generateOrderId = () => {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `ORD-${timestamp}-${random}`;
};

export const generateVANumber = (bank, amount) => {
  const bankCodes = {
    bca: '880',
    mandiri: '890',
    bni: '860'
  };

  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');

  return `${bankCodes[bank]}${timestamp.slice(-6)}${random}`;
};

export const saveCartToStorage = (items) => {
  try {
    localStorage.setItem('cart', JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
};

export const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    if (!savedCart) return [];

    const parsed = JSON.parse(savedCart);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
    return [];
  }
};

export const clearCartFromStorage = () => {
  try {
    localStorage.removeItem('cart');
  } catch (error) {
    console.error('Failed to clear cart from localStorage:', error);
  }
};
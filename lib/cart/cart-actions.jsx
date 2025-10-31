import { saveCartToStorage } from './cart-utils';

// Cart action functions
export const addToCart = (cartItems, product, quantity = 1, variant = null) => {
  const existingItemIndex = cartItems.findIndex(
    item => item.id === product.id && item.variant === variant
  );

  let updatedCart;

  if (existingItemIndex !== -1) {
    // Update existing item quantity
    updatedCart = [...cartItems];
    updatedCart[existingItemIndex].quantity += quantity;
  } else {
    // Add new item to cart
    const newItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      variant,
      addedAt: new Date().toISOString()
    };
    updatedCart = [...cartItems, newItem];
  }

  saveCartToStorage(updatedCart);
  return updatedCart;
};

export const updateCartItemQuantity = (cartItems, itemId, newQuantity) => {
  if (newQuantity <= 0) {
    return removeFromCart(cartItems, itemId);
  }

  const updatedCart = cartItems.map(item =>
    item.id === itemId ? { ...item, quantity: newQuantity } : item
  );

  saveCartToStorage(updatedCart);
  return updatedCart;
};

export const removeFromCart = (cartItems, itemId) => {
  const updatedCart = cartItems.filter(item => item.id !== itemId);
  saveCartToStorage(updatedCart);
  return updatedCart;
};

export const clearCart = () => {
  try {
    localStorage.removeItem('cart');
    return [];
  } catch (error) {
    console.error('Failed to clear cart:', error);
    return [];
  }
};

export const getCartItemCount = (cartItems) => {
  if (!Array.isArray(cartItems)) return 0;
  return cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
};

export const isItemInCart = (cartItems, productId, variant = null) => {
  return cartItems.some(item =>
    item.id === productId && item.variant === variant
  );
};

export const getCartItemQuantity = (cartItems, productId, variant = null) => {
  const item = cartItems.find(item =>
    item.id === productId && item.variant === variant
  );
  return item ? item.quantity : 0;
};
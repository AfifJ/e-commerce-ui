"use client";

import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial cart state
const initialState = {
  items: [
    {
      id: 1,
      name: "iPhone 15 Pro Max 256GB",
      price: 18499000,
      originalPrice: 19999000,
      image: "https://images.unsplash.com/photo-1592286115803-a1c3b552ee43?w=300&h=300&fit=crop&crop=center",
      variant: "Natural Titanium",
      quantity: 1,
      category: "Elektronik",
      vendorId: "apple-store",
      stock: 15
    },
    {
      id: 2,
      name: "MacBook Air M2 13-inch",
      price: 15999000,
      originalPrice: 17999000,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop&crop=center",
      variant: "Midnight",
      quantity: 1,
      category: "Elektronik",
      vendorId: "apple-store",
      stock: 8
    },
    {
      id: 3,
      name: "Nike Air Max 270",
      price: 1599000,
      originalPrice: 1899000,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop&crop=center",
      variant: "Black/White",
      quantity: 2,
      category: "Fashion",
      vendorId: "nike-official",
      stock: 25
    }
  ],
  totalItems: 4,
  subtotal: 52097000,
  total: 52097000,
  shipping: 0,
  discount: 0,
  voucher: null,
  orderNotes: '',
  shippingAddress: {
    city: '',
    postalCode: '',
    address: ''
  }
};

// Cart actions
export const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  APPLY_VOUCHER: 'APPLY_VOUCHER',
  REMOVE_VOUCHER: 'REMOVE_VOUCHER',
  UPDATE_NOTES: 'UPDATE_NOTES',
  UPDATE_SHIPPING: 'UPDATE_SHIPPING',
  LOAD_CART: 'LOAD_CART'
};

// Cart reducer
function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItem = state.items.find(item =>
        item.id === action.payload.id &&
        item.variant === action.payload.variant
      );

      let newItems;
      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === action.payload.id && item.variant === action.payload.variant
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        newItems = [...state.items, { ...action.payload }];
      }

      const newSubtotal = calculateSubtotal(newItems);

      return {
        ...state,
        items: newItems,
        totalItems: calculateTotalItems(newItems),
        subtotal: newSubtotal,
        total: calculateTotal(newSubtotal, state.shipping, state.discount)
      };
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const newItems = state.items.filter(item =>
        !(item.id === action.payload.id && item.variant === action.payload.variant)
      );

      const newSubtotal = calculateSubtotal(newItems);

      return {
        ...state,
        items: newItems,
        totalItems: calculateTotalItems(newItems),
        subtotal: newSubtotal,
        total: calculateTotal(newSubtotal, state.shipping, state.discount)
      };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const newItems = state.items.map(item =>
        item.id === action.payload.id && item.variant === action.payload.variant
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0);

      const newSubtotal = calculateSubtotal(newItems);

      return {
        ...state,
        items: newItems,
        totalItems: calculateTotalItems(newItems),
        subtotal: newSubtotal,
        total: calculateTotal(newSubtotal, state.shipping, state.discount)
      };
    }

    case CART_ACTIONS.CLEAR_CART:
      return {
        ...initialState,
        orderNotes: state.orderNotes,
        shippingAddress: state.shippingAddress
      };

    case CART_ACTIONS.APPLY_VOUCHER: {
      const newTotal = calculateTotal(state.subtotal, state.shipping, action.payload.discount);

      return {
        ...state,
        voucher: action.payload,
        discount: action.payload.discount,
        total: newTotal
      };
    }

    case CART_ACTIONS.REMOVE_VOUCHER: {
      const newTotal = calculateTotal(state.subtotal, state.shipping, 0);

      return {
        ...state,
        voucher: null,
        discount: 0,
        total: newTotal
      };
    }

    case CART_ACTIONS.UPDATE_NOTES:
      return {
        ...state,
        orderNotes: action.payload
      };

    case CART_ACTIONS.UPDATE_SHIPPING: {
      const newTotal = calculateTotal(state.subtotal, action.payload, state.discount);

      return {
        ...state,
        shipping: action.payload,
        total: newTotal
      };
    }

    case CART_ACTIONS.LOAD_CART:
      return action.payload || initialState;

    default:
      return state;
  }
}

// Helper functions
function calculateSubtotal(items) {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function calculateTotalItems(items) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

function calculateTotal(subtotal, shipping, discount) {
  return subtotal + shipping - discount;
}

// Create context
const CartContext = createContext();

// Cart provider component
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: parsedCart });
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);

  // Save cart to localStorage on state change
  useEffect(() => {
    try {
      const cartData = {
        items: state.items,
        totalItems: state.totalItems,
        subtotal: state.subtotal,
        total: state.total,
        shipping: state.shipping,
        discount: state.discount,
        voucher: state.voucher,
        orderNotes: state.orderNotes,
        shippingAddress: state.shippingAddress
      };
      localStorage.setItem('cart', JSON.stringify(cartData));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [state]);

  // Cart action functions
  const addToCart = (product, quantity = 1, variant = 'default') => {
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        variant,
        quantity,
        category: product.category,
        vendorId: product.vendorId,
        stock: product.stock || 10
      }
    });
  };

  const removeFromCart = (productId, variant = 'default') => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { id: productId, variant }
    });
  };

  const updateQuantity = (productId, quantity, variant = 'default') => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { id: productId, quantity, variant }
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const applyVoucher = (voucher) => {
    dispatch({
      type: CART_ACTIONS.APPLY_VOUCHER,
      payload: voucher
    });
  };

  const removeVoucher = () => {
    dispatch({ type: CART_ACTIONS.REMOVE_VOUCHER });
  };

  const updateOrderNotes = (notes) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_NOTES,
      payload: notes
    });
  };

  const updateShipping = (cost) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_SHIPPING,
      payload: cost
    });
  };

  const getItemQuantity = (productId, variant = 'default') => {
    const item = state.items.find(item =>
      item.id === productId && item.variant === variant
    );
    return item ? item.quantity : 0;
  };

  const isInCart = (productId, variant = 'default') => {
    return state.items.some(item =>
      item.id === productId && item.variant === variant
    );
  };

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyVoucher,
    removeVoucher,
    updateOrderNotes,
    updateShipping,
    getItemQuantity,
    isInCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default CartContext;
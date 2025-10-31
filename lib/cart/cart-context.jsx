"use client";

import { createContext, useContext, useReducer, useEffect } from 'react';
import { loadCartFromStorage } from './cart-utils';
import { addToCart, updateCartItemQuantity, removeFromCart, clearCart } from './cart-actions';

// Cart context for managing cart state
const CartContext = createContext();

// Cart action types
const CART_ACTIONS = {
  SET_CART: 'SET_CART',
  ADD_TO_CART: 'ADD_TO_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  APPLY_VOUCHER: 'APPLY_VOUCHER',
  REMOVE_VOUCHER: 'REMOVE_VOUCHER',
  UPDATE_ORDER_NOTES: 'UPDATE_ORDER_NOTES',
  UPDATE_SHIPPING: 'UPDATE_SHIPPING'
};

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.SET_CART:
      return {
        ...state,
        items: action.payload,
        loading: false
      };

    case CART_ACTIONS.ADD_TO_CART:
      return {
        ...state,
        items: addToCart(state.items, action.payload.product, action.payload.quantity, action.payload.variant),
        loading: false
      };

    case CART_ACTIONS.UPDATE_QUANTITY:
      return {
        ...state,
        items: updateCartItemQuantity(state.items, action.payload.itemId, action.payload.quantity),
        loading: false
      };

    case CART_ACTIONS.REMOVE_FROM_CART:
      return {
        ...state,
        items: removeFromCart(state.items, action.payload),
        loading: false
      };

    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: clearCart(),
        loading: false
      };

    case CART_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case CART_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case CART_ACTIONS.APPLY_VOUCHER:
      return {
        ...state,
        voucher: action.payload,
        loading: false
      };

    case CART_ACTIONS.REMOVE_VOUCHER:
      return {
        ...state,
        voucher: null,
        loading: false
      };

    case CART_ACTIONS.UPDATE_ORDER_NOTES:
      return {
        ...state,
        orderNotes: action.payload
      };

    case CART_ACTIONS.UPDATE_SHIPPING:
      return {
        ...state,
        shipping: action.payload
      };

    default:
      return state;
  }
};

// Initial state
const initialState = {
  items: [],
  loading: true,
  error: null,
  // Additional state for cart summary
  voucher: null,
  orderNotes: '',
  shipping: 15000
};

// Cart provider component
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = loadCartFromStorage();
      dispatch({ type: CART_ACTIONS.SET_CART, payload: savedCart });
    } catch (error) {
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: 'Failed to load cart' });
    }
  }, []);

  // Cart actions
  const addToCartAction = (product, quantity = 1, variant = null) => {
    dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
    setTimeout(() => {
      dispatch({
        type: CART_ACTIONS.ADD_TO_CART,
        payload: { product, quantity, variant }
      });
    }, 300); // Simulate loading
  };

  const updateQuantityAction = (itemId, quantity) => {
    dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
    setTimeout(() => {
      dispatch({
        type: CART_ACTIONS.UPDATE_QUANTITY,
        payload: { itemId, quantity }
      });
    }, 300);
  };

  const removeFromCartAction = (itemId) => {
    dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
    setTimeout(() => {
      dispatch({
        type: CART_ACTIONS.REMOVE_FROM_CART,
        payload: itemId
      });
    }, 300);
  };

  const clearCartAction = () => {
    dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
    setTimeout(() => {
      dispatch({ type: CART_ACTIONS.CLEAR_CART });
    }, 300);
  };

  const applyVoucher = (voucher) => {
    dispatch({ type: CART_ACTIONS.APPLY_VOUCHER, payload: voucher });
  };

  const removeVoucher = () => {
    dispatch({ type: CART_ACTIONS.REMOVE_VOUCHER });
  };

  const updateOrderNotes = (notes) => {
    dispatch({ type: CART_ACTIONS.UPDATE_ORDER_NOTES, payload: notes });
  };

  const updateShipping = (shipping) => {
    dispatch({ type: CART_ACTIONS.UPDATE_SHIPPING, payload: shipping });
  };

  // Computed properties
  const totalItems = Array.isArray(state.items)
    ? state.items.reduce((total, item) => total + (item.quantity || 1), 0)
    : 0;
  const subtotal = Array.isArray(state.items)
    ? state.items.reduce((total, item) => total + ((item.price || 0) * (item.quantity || 1)), 0)
    : 0;
  const discount = state.voucher ? (state.voucher.discount || 0) : 0;
  const total = subtotal + state.shipping - discount;

  const value = {
    ...state,
    // Computed properties
    totalItems,
    subtotal,
    discount,
    total,
    // Actions
    addToCart: addToCartAction,
    updateQuantity: updateQuantityAction,
    removeFromCart: removeFromCartAction,
    clearCart: clearCartAction,
    applyVoucher,
    removeVoucher,
    updateOrderNotes,
    updateShipping
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default CartContext;
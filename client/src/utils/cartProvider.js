import React, { createContext, useState, useContext } from 'react';
import { useImmerReducer } from 'use-immer';

// A list of actions that can be dispatched to the cart reducer
const actions = {
  SET_ITEM: 'SET_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  ADD_ONE: 'ADD_ONE',
  REMOVE_ONE: 'REMOVE_ONE',
  CLEAR_CART: 'CLEAR_CART',
};

// Create card reducer
const cartReducer = (state, action) => {
  // Since immer is used, the state can be directly mutated
  switch (action.type) {
    case actions.SET_ITEM: {
      // Check if item already exists in cart
      const itemIndex = state.cartItems.findIndex((item) => item.productId === action.productId);
      if (itemIndex >= 0) {
        // Item already exists in cart, update the quantity
        let newQuantity = action.quantity;
        // If quantity is 0, remove the item from the cart
        if (newQuantity === 0) {
          state.cartItems = state.cartItems.filter((item) => item.productId !== action.productId);
          break;
        }
        // Otherwise, update the quantity
        // Make sure quantity is not negative
        newQuantity = Math.max(1, newQuantity);
        state.cartItems[itemIndex].quantity = newQuantity;
        break;
      }
      // Otherwise, add item to cart
      state.cartItems.push({ productId: action.productId, quantity: action.quantity });
      break;
    }
    case actions.REMOVE_ITEM: {
      // Filter out the item to be removed
      state.cartItems = state.cartItems.filter((item) => item.productId !== action.productId);
      break;
    }
    case actions.ADD_ONE: {
      // Check if item already exists in cart
      const itemIndex = state.cartItems.findIndex((item) => item.productId === action.productId);
      if (itemIndex >= 0) {
        // Item already exists in cart, update the quantity
        state.cartItems[itemIndex].quantity += 1;
        break;
      }
      // Otherwise, add item to cart
      state.cartItems.push({ productId: action.productId, quantity: 1 });
      break;
    }
    case actions.REMOVE_ONE: {
      // Check if item already exists in cart
      const itemIndex = state.cartItems.findIndex((item) => item.productId === action.productId);
      if (itemIndex >= 0) {
        // Item already exists in cart, update the quantity
        state.cartItems[itemIndex].quantity -= 1;
        // If quantity is 0, remove the item from the cart
        if (state.cartItems[itemIndex].quantity === 0) {
          state.cartItems = state.cartItems.filter((item) => item.productId !== action.productId);
        }
        break;
      }
      // If item is not in cart, do nothing
      break;
    }
    case actions.CLEAR_CART: {
      // Clear the cart
      state.cartItems = [];
      break;
    }
    default: {
      // Unknown action type, do nothing to the current state
      break;
    }
  }
  // Update local storage
  localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
};

// Create cart context
// const CartContext = createContext();
export const CartContext = createContext();

// Create cart provider
export default function CartProvider({ children }) {
  const [state, dispatch] = useImmerReducer(cartReducer, { cartItems: [] }, (init) => {
    // Get cart items from local storage
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
      return { cartItems: JSON.parse(cartItems) };
    }
    return init;
  });

  // Children components can access the cart state (cartItems) and dispatch functions from this object
  const providerValue = {
    // The current cart state
    cartItems: state.cartItems,
    // The total number of items in the cart
    itemCount: state.cartItems.reduce((total, item) => total + item.quantity, 0),
    // Dispatch function to add/update an item in the cart given a productId and quantity. By default, quantity is 1.
    setItem: (productId, quantity = 1) => dispatch({ type: actions.SET_ITEM, productId, quantity }),
    // Dispatch function to remove an item from the cart given a productId
    removeItem: (productId) => dispatch({ type: actions.REMOVE_ITEM, productId }),
    // Dispatch function to add one quantity to an item in the cart given a productId
    addOne: (productId) => dispatch({ type: actions.ADD_ONE, productId }),
    // Dispatch function to remove one quantity from an item in the cart given a productId
    removeOne: (productId) => dispatch({ type: actions.REMOVE_ONE, productId }),
    removeItemFromCart: (productId) => dispatch({ type: actions.REMOVE_ITEM, productId }),
    // Dispatch function to clear the cart
    clearCart: () => dispatch({ type: actions.CLEAR_CART }),
  };

  return <CartContext.Provider value={providerValue}>{children}</CartContext.Provider>;
}

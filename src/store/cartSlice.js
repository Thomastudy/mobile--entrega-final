// src/store/cartSlice.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  items: []  // array de { productId: string, qty: number }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    loadCart: (state, action) => {
      // Inicializa el carrito desde SQLite
      state.items = action.payload;
    },
    addToCart: (state, action) => {
      const productId = action.payload;
      const existing = state.items.find(i => i.productId === productId);
      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ productId, qty: 1 });
      }
    },
    clearCart: state => {
      state.items = [];
    }
  }
});

export const { loadCart, addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

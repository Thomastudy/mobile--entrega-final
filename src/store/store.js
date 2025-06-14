// src/store/store.js

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import { authApi } from "./authApi";
import authSlice from "./authSlice";

export default configureStore({
  reducer: {
    cart: cartReducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

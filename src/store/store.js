// src/store/store.js

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import { authApi } from "./authApi";
import authReducer from "../features/authSlice";
import userReducer from "../features/userSlice";

export default configureStore({
  reducer: {
    cart: cartReducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

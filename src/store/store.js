// src/store/store.js

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
import { authApi } from "./authApi";
import authReducer from "../slices/authSlice";
import userReducer from "../slices/userSlice";
import { userApi } from "./userApi";

export default configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    auth: authReducer,
    user: userReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware),
});

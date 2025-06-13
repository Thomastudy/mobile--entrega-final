import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import { authApi } from "./authApi";


export default configureStore({
  reducer: {
    cart: cartReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

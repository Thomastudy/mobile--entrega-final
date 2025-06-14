import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    value: {
      email: "",
      localId: "",
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.value.email = action.payload.email;
      state.value.localId = action.payload.localId;
    },
  },
});

export const { setAuthUser } = authSlice.actions;
export default authSlice.reducer;

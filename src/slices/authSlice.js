import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { email: "", localId: "", photoURL: null },
  reducers: {
    setUser: (state, { payload: { email, localId, photoURL } }) => {
      state.email = email;
      state.localId = localId;
      state.photoURL = photoURL || state.photoURL;
    },
    clearUser: (state) => {
      state.email = "";
      state.localId = "";
      state.photoURL = null;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;

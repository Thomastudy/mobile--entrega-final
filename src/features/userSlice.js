import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    profilePicture: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfilePicture: (state, action) => {
      state.value.profilePicture = action.payload;
    },
  },
});

export const { setProfilePicture } = userSlice.actions;
export default userSlice.reducer;

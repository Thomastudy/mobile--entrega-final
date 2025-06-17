import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    profilePicture: "",
  },
  reducers: {
    setProfilePicture: (state, action) => {
      state.profilePicture = action.payload;
    },
  },
});

export const { setProfilePicture } = userSlice.actions;
export default userSlice.reducer;

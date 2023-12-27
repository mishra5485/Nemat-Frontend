import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};



const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setAddmin(state, value) {
      state.user = value.payload;
    },
  },
});

export const { setAddmin } = profileSlice.actions;
export default profileSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("token") ? true : false;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isLogined: (state, action) => {
      return action.payload;
    },
  },
});

export const { isLogined } = authSlice.actions;
export default authSlice.reducer;

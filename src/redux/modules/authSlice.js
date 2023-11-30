import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => false,
    login: () => true,
  },
});

export const { logout, login } = authSlice.actions;
export default authSlice.reducer;

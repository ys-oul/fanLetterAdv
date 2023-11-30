import { createSlice } from "@reduxjs/toolkit";
const initialState = "카리나";

const member = createSlice({
  name: "member",
  initialState,
  reducers: {
    setMember: (state, action) => {
      const activeMember = action.payload;
      return activeMember;
    },
  },
});

export const { setMember } = member.actions;
export default member.reducer;

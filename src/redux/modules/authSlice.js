import { createSlice } from "@reduxjs/toolkit";

const getInfo = () => {
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo === null) {
    return {
      isLogined: false,
      avatar: "",
      nickname: "",
      userId: "",
      accessToken: "",
    };
  }
  return { ...userInfo, isLogined: true };
};

const initialState = getInfo();
console.log("initialState: ", initialState);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      const newUser = action.payload;
      return { ...newUser, isLogined: true };
    },
    setLogout: (state, action) => {
      return {
        isLogined: false,
        avatar: "",
        nickname: "",
        userId: "",
        accessToken: "",
      };
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;

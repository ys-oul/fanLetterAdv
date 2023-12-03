import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/api";

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

export const __editInfo = createAsyncThunk(
  "editInfo",
  async (payload, thunkAPI) => {
    // 이미지파일을 FormData에 담는 방법
    const { accessToken, imgFile, nickname } = payload;

    const formData = new FormData();
    // avatar와 nickname 중 하나 또느 모두 변경 가능
    formData.append("avatar", imgFile);
    formData.append("nickname", nickname);

    // 요청 시 Content-Type에 유의
    const response = await api.patch(`/profile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    let data = JSON.parse(localStorage.getItem("userInfo"));
    localStorage.setItem(
      "userInfo",
      JSON.stringify({ ...data, avatar: imgFile, nickname: nickname })
    );

    thunkAPI.dispatch(editInfo(payload));
  }
);

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

export const { setLogin, setLogout, editInfo } = authSlice.actions;
export default authSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//데이터 불러오기
const { data } = await axios.get("http://localhost:5000/letters");
console.log(data);
const initialState = data;

export const __addLetter = createAsyncThunk(
  //action value
  "addLetter",
  //콜백 함수
  async (payload, thunkAPI) => {
    await axios.post("http://localhost:5000/letters", payload);
    thunkAPI.dispatch(addLetter(payload));
  }
);

const letters = createSlice({
  name: "letter",
  initialState,
  reducers: {
    addLetter: (state, action) => {
      const newLetter = action.payload;
      return [newLetter, ...state];
    },

    deleteLetter: (state, action) => {
      const letterId = action.payload;
      return state.filter((letter) => letter.id != letterId);
    },

    editLetter: (state, action) => {
      const { id, editingText } = action.payload;
      return state.map((letter) => {
        if (letter.id == id) {
          return { ...letter, content: editingText };
        }
        return letter;
      });
    },
  },
});

export const { addLetter, deleteLetter, editLetter } = letters.actions;
export default letters.reducer;

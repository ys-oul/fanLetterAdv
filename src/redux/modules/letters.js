import { createSlice } from "@reduxjs/toolkit";

import fakeData from "fakeData.json";

const initialState = fakeData;

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

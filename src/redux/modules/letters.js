import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = "";

export const __setLetter = createAsyncThunk(
  "setLetter",
  async (payload, thunkAPI) => {
    // await axios.get("http://localhost:5000/letters");
    thunkAPI.dispatch(setLetter(payload));
  }
);

export const __addLetter = createAsyncThunk(
  //action value
  "addLetter",
  //콜백 함수
  async (payload, thunkAPI) => {
    await axios.post("http://localhost:5000/letters", payload);
    thunkAPI.dispatch(addLetter(payload));
  }
);

export const __deleteLetter = createAsyncThunk(
  "deleteLetter",
  async (payload, thunkAPI) => {
    await axios.delete(`http://localhost:5000/letters/${payload}`);
    thunkAPI.dispatch(deleteLetter(payload));
  }
);

export const __editLetter = createAsyncThunk(
  "editLetter",
  async (payload, thunkAPI) => {
    await axios.patch(`http://localhost:5000/letters/${payload.id}`, {
      content: payload.editingText,
    });
    thunkAPI.dispatch(editLetter(payload));
  }
);

const letters = createSlice({
  name: "letter",
  initialState,
  reducers: {
    setLetter: (state, action) => {
      return [...action.payload];
    },

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

export const { setLetter, addLetter, deleteLetter, editLetter } =
  letters.actions;
export default letters.reducer;

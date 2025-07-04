import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import PORT from "../infoComponents/PORT";
import type Utenti from "../infoComponents/interfaces";

export const getCategorieAsync = createAsyncThunk(
  "categorie/getCategorieAsync",
  async () => {
    const response = await axios.get(`${PORT}/api/categorie`);
    return response.data;
  }
);

export const addCategorieAsync = createAsyncThunk(
  "categorie/addCategorieAsync",
  async (payload: Utenti) => {
    const response = await axios.post(`${PORT}/api/categorie`, {
  name: payload.name,
});

    return response.data;
  }
);

const categorieSlice = createSlice({
  name: "categorie",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategorieAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategorieAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getCategorieAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addCategorieAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategorieAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addCategorieAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default categorieSlice.reducer;

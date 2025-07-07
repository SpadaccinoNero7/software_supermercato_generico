import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import PORT from "../infoComponents/PORT";
import type Categorie from "../infoComponents/interfaces";

export const getCategorieAsync = createAsyncThunk(
  "categorie/getCategorieAsync",
  async () => {
    const response = await axios.get(`${PORT}/api/categorie`);
    return response.data;
  }
);

export const addCategorieAsync = createAsyncThunk(
  "categorie/addCategorieAsync",
  async (payload: Categorie, {rejectWithValue}) => {
    try {
      const response = await axios.post(`${PORT}/api/categorie`, payload);
      return response.data;
    } catch (err: string | null) {
      if (err.response && err.response.data?.error) {
        return rejectWithValue(err.response.data.error);
      }
      return rejectWithValue("Errore generico durante l'inserimento.");
    }
  }
);

export const deleteCategorieAsync = createAsyncThunk(
  "categorie/deleteCategorieAsync",
  async (id) => {
    await axios.delete(`${PORT}/api/categorie/${id}`);
    return id;
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
        state.error = action.payload as string;
      })
      .addCase(deleteCategorieAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategorieAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((categorie) => categorie.id !== action.payload);
      })
      .addCase(deleteCategorieAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default categorieSlice.reducer;

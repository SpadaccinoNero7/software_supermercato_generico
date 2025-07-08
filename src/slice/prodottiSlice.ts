import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import PORT from "../infoComponents/PORT";
import type ProdottiProps from "../infoComponents/interfaces";

export const getProdottiAsync = createAsyncThunk(
  "prodotti/getProdottiAsync",
  async () => {
    const response = await axios.get(`${PORT}/api/prodotti`);
    return response.data;
  }
);

export const addProdottiAsync = createAsyncThunk(
  "prodotti/addProdottiAsync",
  async (payload: ProdottiProps, {rejectWithValue}) => {
    try {
      const response = await axios.post(`${PORT}/api/prodotti`, payload);
      return response.data;
    } catch (err: string | null) {
      if (err.response && err.response.data?.error) {
        return rejectWithValue(err.response.data.error);
      }
      return rejectWithValue("Errore generico durante l'inserimento.");
    }
  }
);

export const deleteProdottiAsync = createAsyncThunk(
  "prodotti/deleteProdottiAsync",
  async (id) => {
    await axios.delete(`${PORT}/api/prodotti/${id}`);
    return id;
  }
);

const categorieSlice = createSlice({
  name: "prodotti",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProdottiAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProdottiAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getProdottiAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addProdottiAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProdottiAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addProdottiAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteProdottiAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProdottiAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((prodotti) => prodotti.id !== action.payload);
      })
      .addCase(deleteProdottiAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default categorieSlice.reducer;

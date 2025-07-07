import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import PORT from "../infoComponents/PORT";
import type Utenti from "../infoComponents/interfaces";

export const getUtentiAsync = createAsyncThunk(
  "utenti/getUtentiAsync",
  async () => {
    const response = await axios.get(`${PORT}/api/utenti`);
    return response.data;
  }
);

export const addUtentiAsync = createAsyncThunk(
  "utenti/addUtentiAsync",
  async (payload: Utenti) => {
    const response = await axios.post(`${PORT}/api/utenti`, {
  name: payload.name,
  age: payload.age,
  is_admin: payload.is_admin,
  date: new Date().toISOString(),
  password_utente: payload.password_utente,
  codice_utente: payload.codice_utente,
});

    return response.data;
  }
);

export const deleteUtentiAsync = createAsyncThunk(
  "utenti/deleteUtentiAsync",
  async (id) => {
    await axios.delete(`${PORT}/api/utenti/${id}`);
    return id;
  }
);

const utentiSlice = createSlice({
  name: "utenti",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUtentiAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUtentiAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getUtentiAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addUtentiAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUtentiAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addUtentiAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUtentiAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUtentiAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((utenti) => utenti.id !== action.payload);
      })
      .addCase(deleteUtentiAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default utentiSlice.reducer;

import { configureStore } from '@reduxjs/toolkit'
import utentiReducer from '../slice/utentiSlice'
import categorieReducer from '../slice/categorieSlice'

export const store = configureStore({
  reducer: {
    utenti: utentiReducer,
    categorie: categorieReducer
  }
})
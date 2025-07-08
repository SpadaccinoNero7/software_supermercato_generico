import { configureStore } from '@reduxjs/toolkit'
import utentiReducer from '../slice/utentiSlice'
import categorieReducer from '../slice/categorieSlice'
import viewModeReducer from '../slice/darkLightModeSlice'
import prodottiReducer from '../slice/prodottiSlice'

export const store = configureStore({
  reducer: {
    utenti: utentiReducer,
    categorie: categorieReducer,
    viewMode: viewModeReducer,
    prodotti: prodottiReducer
  }
})
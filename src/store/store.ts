import { configureStore } from '@reduxjs/toolkit'
import utentiReducer from '../slice/utentiSlice'

export const store = configureStore({
  reducer: {
    utenti: utentiReducer
  }
})
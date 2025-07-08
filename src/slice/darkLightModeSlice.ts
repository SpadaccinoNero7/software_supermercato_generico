import { createSlice } from '@reduxjs/toolkit'

export interface ViewMode {
  value: 'light' | 'dark'
}

const initialState: ViewMode = {
  value: 'dark',
}

export const darkLightModeSlice = createSlice({
  name: 'viewMode',
  initialState,
  reducers: {
    toggleMode: (state) => {
      if (state.value === 'light') {
        state.value = 'dark'
      } else {
        state.value = 'light'
        }
    },
  },
})

// Action creators are generated for each case reducer function
export const { toggleMode } = darkLightModeSlice.actions

export default darkLightModeSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

type ThemeState = {
  mode: 'light' | 'dark'
}

const getInitialTheme = (): 'light' | 'dark' => {
  const saved = localStorage.getItem('theme')
  return (saved === 'dark' || saved === 'light') ? saved : 'light'
}

const initialState: ThemeState = {
  mode: getInitialTheme(),
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', state.mode)
    },
    setTheme(state, action) {
      state.mode = action.payload
      localStorage.setItem('theme', state.mode)
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer

import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  favoritesItems: [],
}

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      return {
        ...state,
        favoritesItems: action.payload || [],
      }
    },
  },
})

// Action
export const { setProducts } = favoritesSlice.actions

export default favoritesSlice.reducer

// thunk
export const getFavorites = () => dispatch => {
  dispatch(setProducts(JSON.parse(localStorage.getItem('favorites'))))
}
import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  // корзина
  cartItems: [],
  totalCost: 0,

  // товары для сравнения
  compareItems: [],

  // избранные товары
  favoritesItems: [],
}

export const cartSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartItems = action.payload || []
      state.totalCost = action.payload?.reduce((totalCost, item) => totalCost + item.cost , 0)
    },
    setCompare: (state, action) => {
      state.compareItems = action.payload || []
    },
    setFavorites: (state, action) => {
      state.favoritesItems = action.payload || []
    },
  },
})

// Action
export const { setCart, setCompare, setFavorites } = cartSlice.actions

export default cartSlice.reducer

// Selector
export const storeSelector = state => state.store

// thunk
export const getStore = () => dispatch => {
  dispatch(setCart(JSON.parse(localStorage.getItem('cart'))))
  dispatch(setCompare(JSON.parse(localStorage.getItem('compare'))))
  dispatch(setFavorites(JSON.parse(localStorage.getItem('favorites'))))
}

export const getCart = () => dispatch => {
  dispatch(setCart(JSON.parse(localStorage.getItem('cart'))))
}

export const getCompare = () => dispatch => {
  dispatch(setCompare(JSON.parse(localStorage.getItem('compare'))))
}

export const getFavorites = () => dispatch => {
  dispatch(setFavorites(JSON.parse(localStorage.getItem('favorites'))))
}
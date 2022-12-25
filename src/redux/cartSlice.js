import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  cartItems: [],
  totalCost: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      return {
        ...state,
        cartItems: action.payload || [],
        totalCost: action.payload?.reduce((totalCost, item) => totalCost + item.cost , 0),
      }
    },
  },
})

// Action
export const { setProducts } = cartSlice.actions

export default cartSlice.reducer

// thunk
export const getCart = () => dispatch => {
  dispatch(setProducts(JSON.parse(localStorage.getItem('cart'))))
}
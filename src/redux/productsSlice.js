import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  productItems: [],
  isLoaded: false,
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      return {
        ...state,
        productItems: action.payload,
        isLoaded: true,
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { setProducts } = productsSlice.actions

export default productsSlice.reducer
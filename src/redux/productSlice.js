import { createSlice } from '@reduxjs/toolkit'
import { productsAPI } from '../api/api'


const initialState = {
  productItem: [],
  isLoaded: false,
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state, action) => {
      return {
        ...state,
        productItem: action.payload,
        isLoaded: true,
      }
    },
    setLoaded: (state, action) => {
      return {
        ...state,
        isLoaded: action.payload,
      }
    },
  },
})

// Action
export const { setProduct, setLoaded } = productSlice.actions

export default productSlice.reducer

// thunk
export const getProduct = (id) => dispatch => {
  dispatch(setLoaded(false))
  productsAPI.getProduct(id).then(res => dispatch(setProduct(res.data)))
}
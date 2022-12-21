import { createSlice } from '@reduxjs/toolkit'
import { productsAPI } from '../api/api'


const initialState = {
  productItems: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, ],
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
    setLoaded: (state, action) => {
      return {
        ...state,
        isLoaded: action.payload,
      }
    }
  },
})

// Action
export const { setProducts, setLoaded } = productsSlice.actions

export default productsSlice.reducer

// thunk
export const getProducts = (categoryActive, sortActive) => dispatch => {
  dispatch(setLoaded(false))
  productsAPI.getProducts(categoryActive, sortActive).then(res => dispatch(setProducts(res.data)))
}
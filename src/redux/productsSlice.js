import { createSlice } from '@reduxjs/toolkit'
import { productsAPI } from '../api/api'


const initialState = {
  productItems: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, ],
  isLoaded: false,
  totalItems: 0,
  limitItems: 8,
  currentPage: 1,
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
    },
    setTotalItems: (state, action) => {
      return {
        ...state,
        totalItems: +action.payload,
      }
    },
    setCurrentPage: (state, action) => {
      return {
        ...state,
        currentPage: action.payload,
      }
    },
  },
})

// Action
export const { setProducts, setLoaded, setTotalItems, setCurrentPage } = productsSlice.actions

export default productsSlice.reducer

// thunk
export const getProducts = (categoryActive, sortActive, currentPage, limitItems) => dispatch => {
  dispatch(setLoaded(false))
  productsAPI.getProducts(categoryActive, sortActive, currentPage, limitItems).then(res => {
    dispatch(setProducts(res.data))
    dispatch(setTotalItems(res.headers['x-total-count']))
  })
}

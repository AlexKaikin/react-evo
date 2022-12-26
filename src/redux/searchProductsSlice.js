import { createSlice } from '@reduxjs/toolkit'
import { productsAPI } from '../api/api'


const initialState = {
  productItems: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, ],
  isLoaded: false,
  query: '',
}

export const searchProductsSlice = createSlice({
  name: 'search',
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
    setQuery: (state, action) => {
      return {
        ...state,
        query: action.payload,
      }
    },
  },
})

// Action
export const { setProducts, setLoaded, setQuery } = searchProductsSlice.actions

export default searchProductsSlice.reducer

// thunk
export const getSearchProducts = (searchValue) => dispatch => {
  dispatch(setLoaded(false))
  productsAPI.getSearchProducts(searchValue).then(res => dispatch(setProducts(res.data)))
  dispatch(setQuery(searchValue))
}
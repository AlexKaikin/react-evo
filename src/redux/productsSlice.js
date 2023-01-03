import { createSlice } from '@reduxjs/toolkit'
import { productsAPI } from '../api/api'


const initialState = {
  productItems: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, ],
  productItem: {},

  // индикатор загрузки товаров/товара
  isLoaded: false,

  // пагинация
  pagesCount: 0,    // количество страниц товаров
  totalItems: 0,    // количество товаров на сервере
  limitItems: 8,    // лимит товаров на страницу
  currentPage: 1,   // текущая страница
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.productItems = action.payload
      state.isLoaded = true
    },
    setProduct: (state, action) => {
      state.productItem = action.payload
      state.isLoaded = true
    },
    setLoaded: (state, action) => {
      state.isLoaded = action.payload
    },
    setTotalItems: (state, action) => {
      state.totalItems = +action.payload
      state.pagesCount = Math.ceil(+action.payload / initialState.limitItems)
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
  },
})

// Action
export const { setProducts, setProduct, setLoaded, setTotalItems, setCurrentPage } = productsSlice.actions

export default productsSlice.reducer

// Selector
export const productsSelector = state => state.products

// thunk
// загрузка товаров
export const getProducts = (categoryActive, sortActive, currentPage) => async dispatch => {
  dispatch(setLoaded(false))
  
  try {
    const res = await productsAPI.getProducts(categoryActive, sortActive, currentPage, initialState.limitItems)
    dispatch(setProducts(res.data))
    dispatch(setTotalItems(res.headers['x-total-count']))
  } catch (err) {
    dispatch(setLoaded('error'))
    console.log(err)
  }
}

// загрузка товара
export const getProduct = (id) => async dispatch => {
  dispatch(setLoaded(false))
  try{
    const res = await productsAPI.getProduct(id)
    dispatch(setProduct(res.data))
  }catch(err){
    dispatch(setLoaded('error'))
    console.log(err)
  }
  
}

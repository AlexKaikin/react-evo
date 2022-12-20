import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './productsSlice'
import productsFilterReducer from './productsFilterSlice'


export const store = configureStore({
  reducer: {
    products: productsReducer,
    productsFilter: productsFilterReducer,
  },
})
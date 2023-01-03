import { configureStore } from '@reduxjs/toolkit'

import productsReducer from './productsSlice'
import filterReducer from './filterSlice'
import searchReducer from './searchSlice'
import storeReducer from './storeSlice'


export const store = configureStore({
  reducer: {
    products: productsReducer,
    filter: filterReducer,
    search: searchReducer,
    store: storeReducer,
  },
})
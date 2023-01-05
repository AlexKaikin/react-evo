import { configureStore } from '@reduxjs/toolkit'

import productsReducer from './productsSlice'
import filterReducer from './filterSlice'
import searchReducer from './searchSlice'
import storeReducer from './storeSlice'
import { useDispatch } from 'react-redux'


export const store = configureStore({
  reducer: {
    products: productsReducer,
    filter: filterReducer,
    search: searchReducer,
    store: storeReducer,
  },
})

// тип для store
export type RootState = ReturnType<typeof store.getState>

// типизированный dispatch
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() 
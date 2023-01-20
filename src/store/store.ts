import { configureStore } from '@reduxjs/toolkit'

import productsReducer from './productsSlice'
import navigationReducer from './navigationSlice'
import searchReducer from './searchSlice'
import storeReducer from './storeSlice'
import { useDispatch } from 'react-redux'


export const store = configureStore({
  reducer: {
    products: productsReducer,
    navigation: navigationReducer,
    search: searchReducer,
    store: storeReducer,
  },
})

// типизация store
export type RootState = ReturnType<typeof store.getState>

// типизация dispatch
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() 
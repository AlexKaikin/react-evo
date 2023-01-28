import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import productsReducer from './productsSlice'
import navigationReducer from './navigationSlice'
import searchReducer from './searchSlice'
import storeReducer from './storeSlice'
import authReducer from './authSlice'


export const store = configureStore({
  reducer: {
    products: productsReducer,
    navigation: navigationReducer,
    search: searchReducer,
    store: storeReducer,
    auth: authReducer,
  },
})

// типизация store
export type RootState = ReturnType<typeof store.getState>

// типизация dispatch
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() 
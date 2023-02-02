import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import productsReducer from './products/productsSlice'
import navigationReducer from './navigation/navigationSlice'
import storeReducer from './products/storeSlice'
import authReducer from './account/authSlice'
import orderReducer from './products/orderSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    navigation: navigationReducer,
    store: storeReducer,
    auth: authReducer,
    order: orderReducer,
  },
})

// типизация store
export type RootState = ReturnType<typeof store.getState>

// типизация dispatch
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

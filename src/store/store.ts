import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import productsReducer from './products/productsSlice'
import reviewsReducer from './products/reviewsSlice'

import navigationReducer from './navigation/navigationSlice'
import storeReducer from './products/storeSlice'
import authReducer from './account/authSlice'
import orderReducer from './products/orderSlice'
import themeReducer from './theme/themeSlice'

import productsAdminReducer from './admin/products/productsAdminSlice'
import reviewsAdminReducer from './admin/products/reviewsAdminSlice'
import ordersAdminReducer from './admin/products/ordersAdminSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    reviews: reviewsReducer,
    navigation: navigationReducer,
    store: storeReducer,
    auth: authReducer,
    order: orderReducer,
    theme: themeReducer,

    productsAdmin: productsAdminReducer,
    reviewsAdmin: reviewsAdminReducer,
    ordersAdmin: ordersAdminReducer,
  },
})

// типизация store
export type RootState = ReturnType<typeof store.getState>

// типизация dispatch
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

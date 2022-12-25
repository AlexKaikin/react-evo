import { configureStore } from '@reduxjs/toolkit'

import productsReducer from './productsSlice'
import productReducer from './productSlice'
import productsFilterReducer from './productsFilterSlice'
import cartReducer from './cartSlice'
import compareReducer from './compareSlice'
import favoritesReducer from './favoritesSlice'


export const store = configureStore({
  reducer: {
    product: productReducer,
    products: productsReducer,
    productsFilter: productsFilterReducer,
    cart: cartReducer,
    compare: compareReducer,
    favorites: favoritesReducer,
  },
})
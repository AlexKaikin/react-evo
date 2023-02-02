import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getLocalStorage } from '../../utils/utils'
import { ProductItemType } from './productsSlice'
import { RootState } from '../store'
import { ordersAPI } from '../../api/api'
import { OrderItemType } from './orderSlice'

const initialState: StoreType = {
  // корзина
  cartItems: [],
  totalCost: 0,

  // товары для сравнения
  compareItems: [],

  // избранные товары
  favoritesItems: [],
}

export const cartSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItemType[]>) => {
      state.cartItems = action.payload || []
      state.totalCost = action.payload?.reduce(
        (totalCost: number, item: CartItemType) => totalCost + item.cost,
        0
      )
    },
    setCompare: (state, action: PayloadAction<ProductItemType[]>) => {
      state.compareItems = action.payload || []
    },
    setFavorites: (state, action: PayloadAction<ProductItemType[]>) => {
      state.favoritesItems = action.payload || []
    },
  },
})

// Action
export const { setCart, setCompare, setFavorites } = cartSlice.actions

export default cartSlice.reducer

// Selector
export const storeSelector = (state: RootState) => state.store

// thunk
export const getStore = () => (dispatch: Function) => {
  dispatch(setCart(getLocalStorage('cart')))
  dispatch(setCompare(getLocalStorage('compare')))
  dispatch(setFavorites(getLocalStorage('favorites')))
}

export const getCart = () => (dispatch: Function) => {
  dispatch(setCart(getLocalStorage('cart')))
}

export const getCompare = () => (dispatch: Function) => {
  dispatch(setCompare(getLocalStorage('compare')))
}

export const getFavorites = () => (dispatch: Function) => {
  dispatch(setFavorites(getLocalStorage('favorites')))
}

export const createOrder =
  (values: OrderItemType) => async (dispatch: Function, getState: Function) => {
    values.cartItems = getState().store.cartItems
    values.totalCost = getState().store.totalCost
    console.log(values)
    try {
      await ordersAPI.createOrder(values)
    } catch (err) {
      console.log(err)
    }
  }

interface StoreType {
  cartItems: CartItemType[]
  totalCost: number
  compareItems: CompareItemType[]
  favoritesItems: FavoriteItemType[]
}

export type CartItemType = {
  id: number
  title: string
  imgUrl: string
  price: number
  cost: number
  quantity: number
}

export type CompareItemType = ProductItemType

export type FavoriteItemType = ProductItemType

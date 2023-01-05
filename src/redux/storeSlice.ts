import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getLocalStorage } from '../utils/utils'
import { RootState } from './store'


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
    setCart: (state, action: PayloadAction<ItemType[]>) => {
      state.cartItems = action.payload || []
      state.totalCost = action.payload?.reduce((totalCost: number, item: ItemType) => totalCost + item.cost , 0)
    },
    setCompare: (state, action: PayloadAction<ItemType[]>) => {
      state.compareItems = action.payload || []
    },
    setFavorites: (state, action: PayloadAction<ItemType[]>) => {
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

interface StoreType {
  cartItems: ItemType[],
  totalCost: number,
  compareItems: ItemType[],
  favoritesItems: ItemType[],
}

type ItemType = {
  id: number,
  title: string,
  imgUrl: string,
  galleryUrl: string[],
  volume: number,
  volumeMeasurement: string,
  currency: string,
  price: number,
  category: string,
  rating: number,
  property: PropertyType,
  text: string[],
  cost: number,
  quantity: number,
}

type PropertyType = {
  country: string,
  town: string,
  year: number,
}
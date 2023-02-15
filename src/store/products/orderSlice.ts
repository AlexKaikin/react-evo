import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ordersAPI } from '../../api/api'
import { RootState } from '../store'
import { CartItemType } from './storeSlice'

const initialState: OrderType = {
  orderItems: [],
  status: 'loading', // loading, success, error
  pagesCount: 0, // количество страниц товаров
  totalItems: 0, // количество товаров на сервере
  limitItems: 8, // лимит товаров на страницу
  currentPage: 1, // текущая страница
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<OrderItemType[]>) => {
      state.orderItems = action.payload
      state.status = 'success'
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setTotalItems: (state, action: PayloadAction<string>) => {
      state.totalItems = +action.payload
      state.pagesCount = Math.ceil(+action.payload / initialState.limitItems)
    },
  },
})

// Action
export const { setOrders, setStatus, setTotalItems, setCurrentPage } =
  orderSlice.actions

export default orderSlice.reducer

// Selector
export const orderSelector = (state: RootState) => state.order

// thunk
export const getOrders =
  (currentPage: number) => async (dispatch: Function) => {
    dispatch(setStatus('loading'))
    try {
      const res = await ordersAPI.getOrders(
        currentPage,
        initialState.limitItems
      )
      dispatch(setOrders(res.data))
      res.headers['x-total-count'] &&
        dispatch(setTotalItems(res.headers['x-total-count']))
    } catch (err) {
      console.warn(err)
    }
  }

export type OrderType = {
  orderItems: OrderItemType[]
  status: string
  pagesCount: number
  totalItems: number
  limitItems: number
  currentPage: number
}

export type OrderItemType = {
  _id?: number
  id: number
  name: string
  surname: string
  middleName: string
  region: string
  city: string
  street: string
  home: string
  index: number
  cartItems: CartItemType[]
  totalCost: number
  status: string
  created: string
}

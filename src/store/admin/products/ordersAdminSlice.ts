import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ordersAPI } from '../../../api/api'
import { CartItemType } from '../../products/storeSlice'
import { RootState } from '../../store'

const initialState: OrderType = {
  orderItems: [],
  status: 'loading', // loading, success, error
  pagesCount: 0, // количество страниц товаров
  totalItems: 0, // количество товаров на сервере
  limitItems: 8, // лимит товаров на страницу
  currentPage: 1, // текущая страница
}

export const ordersAdminSlice = createSlice({
  name: 'ordersAdmin',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<OrderItemType[]>) => {
      state.orderItems = action.payload
      state.status = 'success'
    },
    setUpdateOrder: (state, action: PayloadAction<OrderItemType>) => {
      const newItem = action.payload
      state.orderItems.splice(
        state.orderItems.findIndex((item) => item.id === newItem.id),
        1,
        newItem
      )
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
export const {
  setOrders,
  setUpdateOrder,
  setStatus,
  setTotalItems,
  setCurrentPage,
} = ordersAdminSlice.actions

export default ordersAdminSlice.reducer

// Selector
export const ordersAdminSelector = (state: RootState) => state.ordersAdmin

// thunk
export const getOrdersAdmin = () => async (dispatch: Function) => {
  dispatch(setStatus('loading'))
  try {
    const res = await ordersAPI.getOrdersAdmin()
    dispatch(setOrders(res.data))
    res.headers['x-total-count'] &&
      dispatch(setTotalItems(res.headers['x-total-count']))
  } catch (err) {
    console.warn(err)
  }
}

export const updateOrder =
  (value: OrderItemType) => async (dispatch: Function) => {
    try {
      await ordersAPI.updateOrder(value)
      dispatch(setUpdateOrder(value))
      return 'ok'
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

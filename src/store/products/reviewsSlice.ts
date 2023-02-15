import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { reviewsAPI } from '../../api/api'
import { RootState } from '../store'

const initialState: ReviewType = {
  reviewItems: [],
  status: 'loading', // loading, success, error
  pagesCount: 0, // количество страниц товаров
  totalItems: 0, // количество товаров на сервере
  limitItems: 8, // лимит товаров на страницу
  currentPage: 1, // текущая страница
}

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setReviews: (state, action: PayloadAction<ReviewItemType[]>) => {
      state.reviewItems = action.payload
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
export const { setReviews, setStatus, setTotalItems, setCurrentPage } =
  reviewsSlice.actions

export default reviewsSlice.reducer

// Selector
export const reviewSelector = (state: RootState) => state.reviews

// thunk
export const getReviews =
  (product_Id: string) => async (dispatch: Function) => {
    dispatch(setStatus('loading'))
    try {
      const res = await reviewsAPI.getReviews(product_Id)
      dispatch(setReviews(res.data))
      res.headers['x-total-count'] &&
        dispatch(setTotalItems(res.headers['x-total-count']))
    } catch (err) {
      console.warn(err)
    }
  }

export const getReviewsProfile =
  (currentPage: number) => async (dispatch: Function) => {
    dispatch(setStatus('loading'))
    try {
      const res = await reviewsAPI.getReviewsProfile(
        currentPage,
        initialState.limitItems
      )
      dispatch(setReviews(res.data))
      res.headers['x-total-count'] &&
        dispatch(setTotalItems(res.headers['x-total-count']))
    } catch (err) {
      console.warn(err)
    }
  }

export const createReview =
  (values: ReviewItemType) =>
  async (dispatch: Function, getState: Function) => {
    try {
      await reviewsAPI.createReview(values)
      return 'ok'
    } catch (err) {
      console.log(err)
    }
  }

export type ReviewType = {
  reviewItems: ReviewItemType[]
  status: string
  pagesCount: number
  totalItems: number
  limitItems: number
  currentPage: number
}

export type ReviewItemType = {
  _id: string
  id: number
  rating: number
  body: string
  published: string
  created: string
  updated: string
  product: string | ProductType
  user?: any
}

export type ProductType = {
  _id: string
  title: string
  id: number
}

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { reviewsAPI } from '../../../api/api'
import { RootState } from '../../store'

const initialState: ReviewsType = {
  reviewItems: [],
  status: 'loading', // loading, success, error
  pagesCount: 0, // количество страниц товаров
  totalItems: 0, // количество товаров на сервере
  limitItems: 8, // лимит товаров на страницу
  currentPage: 1, // текущая страница
}

export const reviewsAdminSlice = createSlice({
  name: 'reviewsAdmin',
  initialState,
  reducers: {
    setReviews: (state, action: PayloadAction<ReviewItemType[]>) => {
      state.reviewItems = action.payload
      state.status = 'success'
    },
    setUpdateReview: (state, action: PayloadAction<ReviewItemType>) => {
      const newItem = action.payload
      state.reviewItems.splice(
        state.reviewItems.findIndex((item) => item.id === newItem.id),
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
  setReviews,
  setUpdateReview,
  setStatus,
  setTotalItems,
  setCurrentPage,
} = reviewsAdminSlice.actions

export default reviewsAdminSlice.reducer

// Selector
export const reviewsAdminSelector = (state: RootState) => state.reviewsAdmin

// thunk
export const getReviewsAdmin =
  (currentPage: number) => async (dispatch: Function) => {
    dispatch(setStatus('loading'))
    try {
      const res = await reviewsAPI.getReviewsAdmin(
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

export const updateReview =
  (value: ReviewItemType) => async (dispatch: Function) => {
    try {
      await reviewsAPI.updateReview(value)
      dispatch(setUpdateReview(value))
      return 'ok'
    } catch (err) {
      console.warn(err)
    }
  }

export const deleteReview = (id: number) => async (dispatch: Function) => {
  try {
    await reviewsAPI.deleteReview(id)
  } catch (err) {
    console.log(err)
  }
}

export type ReviewsType = {
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

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { productsAPI } from '../api/api'
import { RootState } from './store'

const initialState: ProductsType = {
  productItems: [],
  productItem: null,

  // статус загрузки товаров/товара
  status: 'loading', // loading, success, error

  // пагинация
  pagesCount: 0, // количество страниц товаров
  totalItems: 0, // количество товаров на сервере
  limitItems: 8, // лимит товаров на страницу
  currentPage: 1, // текущая страница
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductItemType[]>) => {
      state.productItems = action.payload
      state.status = 'success'
    },
    setProduct: (state, action: PayloadAction<ProductItemType>) => {
      state.productItem = action.payload
      state.status = 'success'
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload
    },
    setTotalItems: (state, action: PayloadAction<string>) => {
      state.totalItems = +action.payload
      state.pagesCount = Math.ceil(+action.payload / initialState.limitItems)
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
  },
})

// Action
export const {
  setProducts,
  setProduct,
  setStatus,
  setTotalItems,
  setCurrentPage,
} = productsSlice.actions

export default productsSlice.reducer

// Selector
export const productsSelector = (state: RootState) => state.products

// thunk
// загрузка товаров
export const getProducts =
  (categoryActive: string, sortActive: string, currentPage: number) =>
  async (dispatch: Function) => {
    dispatch(setStatus('loading'))
    try {
      const res = await productsAPI.getProducts(
        categoryActive,
        sortActive,
        currentPage,
        initialState.limitItems
      )
      dispatch(setProducts(res.data))
      res.headers['x-total-count'] &&
        dispatch(setTotalItems(res.headers['x-total-count']))
    } catch (err) {
      dispatch(setStatus('error'))
      console.log(err)
    }
  }

// загрузка товара
export const getProduct = (id: number) => async (dispatch: Function) => {
  dispatch(setStatus('loading'))
  try {
    const res = await productsAPI.getProduct(id)
    dispatch(setProduct(res.data))
  } catch (err) {
    dispatch(setStatus('error'))
    console.log(err)
  }
}

// создать товар
export const createProduct =
  (data: ProductItemType) => async (dispatch: Function) => {
    try {
      const res = await productsAPI.createProduct(data)
      dispatch(setProduct(res.data))
    } catch (err) {
      console.log(err)
    }
  }

// обновить товар
export const updateProduct =
  (data: ProductItemType) => async (dispatch: Function) => {
    try {
      await productsAPI.updateProduct(data)
      dispatch(setProduct(data))
    } catch (err) {
      console.log(err)
    }
  }

// удалить товар
export const deleteProduct = (id: number) => async (dispatch: Function) => {
  try {
    await productsAPI.deleteProduct(id)
  } catch (err) {
    console.log(err)
  }
}

interface ProductsType {
  productItems: ProductItemType[]
  productItem: ProductItemType | null
  pagesCount: number
  totalItems: number
  limitItems: number
  currentPage: number
  status: string
}

export type ProductItemType = {
  id: number
  title: string
  imgUrl: string
  galleryUrl: string[]
  volume: number
  volumeMeasurement: string
  currency: string
  price: number
  quantity: number
  category: string
  rating: number
  property: PropertyType
  text: string[]
}

type PropertyType = {
  country: string
  town: string
  year: number
}

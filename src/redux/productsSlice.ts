import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { productsAPI } from '../api/api'
import { RootState } from './store'


const initialState: ProductsType = {
  productItems: [],
  productItem: {
                id: 9999, 
                title: 'string',
                imgUrl: 'string',
                galleryUrl: ['string[]'],
                volume: 1,
                volumeMeasurement: 'string',
                currency: 'string',
                price: 1,
                category: 'string',
                rating: 1,
                property: {country: 'string', town: 'string', year: 1},
                text: ['string[]'],
                cost: 1,
                quantity: 1},

  // индикатор загрузки товаров/товара
  isLoaded: false,

  // пагинация
  pagesCount: 0,    // количество страниц товаров
  totalItems: 0,    // количество товаров на сервере
  limitItems: 8,    // лимит товаров на страницу
  currentPage: 1,   // текущая страница

  error: false, // ошибка при загрузке товаров/товара
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ItemType[]>) => {
      state.productItems = action.payload
      state.isLoaded = true
      state.error = false
    },
    setProduct: (state, action: PayloadAction<ItemType>) => {
      state.productItem = action.payload
      state.isLoaded = true
      state.error = false
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload
    },
    setTotalItems: (state, action: PayloadAction<string>) => {
      state.totalItems = +action.payload
      state.pagesCount = Math.ceil(+action.payload / initialState.limitItems)
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload
    },
  },
})

// Action
export const { setProducts, setProduct, setLoaded, setTotalItems, setCurrentPage, setError } = productsSlice.actions

export default productsSlice.reducer

// Selector
export const productsSelector = (state: RootState) => state.products

// thunk
// загрузка товаров
export const getProducts = (categoryActive: string, sortActive: string, currentPage: number) => async (dispatch: Function) => {
  dispatch(setLoaded(false))
  
  try {
    const res = await productsAPI.getProducts(categoryActive, sortActive, currentPage, initialState.limitItems)
    dispatch(setProducts(res.data))
    res.headers['x-total-count'] && dispatch(setTotalItems(res.headers['x-total-count']))
  } catch (err) {
    dispatch(setError(true))
    console.log(err)
  }
}

// загрузка товара
export const getProduct = (id: number) => async (dispatch: Function) => {
  dispatch(setLoaded(false))
  try{
    const res = await productsAPI.getProduct(id)
    dispatch(setProduct(res.data))
  }catch(err){
    dispatch(setError(true))
    console.log(err)
  }
}

interface ProductsType {
  productItems: ItemType[],
  productItem: ItemType,
  isLoaded: boolean, 
  pagesCount: number,
  totalItems: number,
  limitItems: number,
  currentPage: number,
  error: boolean,
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


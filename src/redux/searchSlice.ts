import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { searchAPI } from '../api/api'
import { RootState } from './store'


const initialState: SearchType = {
  items: [],
  query: '',
  isLoaded: false,  // индикатор загрузки товаров/товара

  pagesCount: 0,    // количество страниц товаров
  totalItems: 0,    // количество товаров на сервере
  limitItems: 8,    // лимит товаров на страницу
  currentPage: 1,   // текущая страница
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<ItemType[]>) => {
      state.items = action.payload
      state.isLoaded = true
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload
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
export const { setSearchQuery, setLoaded, setQuery, setTotalItems, setCurrentPage } = searchSlice.actions

export default searchSlice.reducer

// Selector
export const searchSelector = (state: RootState) => state.search

// thunk
export const getSearchQuery = (searchValue: string, currentPage: number) => (dispatch: Function) => {
  dispatch(setLoaded(false))
  searchAPI.getSearchQuery(searchValue, currentPage, initialState.limitItems).then(res => {
    dispatch(setSearchQuery(res.data))
    res.headers['x-total-count'] && dispatch(setTotalItems(res.headers['x-total-count']))
  })
  dispatch(setQuery(searchValue))
}

interface SearchType {
  items: ItemType[],
  query: string,
  isLoaded: boolean, 
  pagesCount: number,
  totalItems: number,
  limitItems: number,
  currentPage: number,
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
  text: string[],
  cost: number,
  quantity: number,
}

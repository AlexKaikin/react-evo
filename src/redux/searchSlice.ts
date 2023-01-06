import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { searchAPI } from '../api/api'
import { RootState } from './store'


const initialState: SearchType = {
  items: [],
  query: '',
  status: 'loading', // статус загрузки товаров/товара loading, success, error

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
      state.status = 'success'
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload
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
export const { setSearchQuery, setStatus, setQuery, setTotalItems, setCurrentPage } = searchSlice.actions

export default searchSlice.reducer

// Selector
export const searchSelector = (state: RootState) => state.search

// thunk
export const getSearchQuery = (searchValue: string, currentPage: number) => async (dispatch: Function) => {
  dispatch(setStatus('loading'))
  try{
    const res = await searchAPI.getSearchQuery(searchValue, currentPage, initialState.limitItems)
    dispatch(setSearchQuery(res.data))
    res.headers['x-total-count'] && dispatch(setTotalItems(res.headers['x-total-count']))
    dispatch(setQuery(searchValue))
  } catch(err){
    dispatch(setStatus('error'))
    console.log(err)
  }
  
}

interface SearchType {
  items: ItemType[],
  query: string,
  status: string, 
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

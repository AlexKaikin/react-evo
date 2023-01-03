import { createSlice } from '@reduxjs/toolkit'
import { searchAPI } from '../api/api'


const initialState = {
  items: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, ],
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
    setSearchQuery: (state, action) => {
      state.items = action.payload
      state.isLoaded = true
    },
    setLoaded: (state, action) => {
      state.isLoaded = action.payload
    },
    setQuery: (state, action) => {
      state.query = action.payload
    },
    setTotalItems: (state, action) => {
      state.totalItems = +action.payload
      state.pagesCount = Math.ceil(+action.payload / initialState.limitItems)
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
  },
})

// Action
export const { setSearchQuery, setLoaded, setQuery, setTotalItems, setCurrentPage } = searchSlice.actions

export default searchSlice.reducer

// Selector
export const searchSelector = state => state.search

// thunk
export const getSearchQuery = (searchValue, currentPage) => dispatch => {
  dispatch(setLoaded(false))
  searchAPI.getSearchQuery(searchValue, currentPage, initialState.limitItems).then(res => {
    dispatch(setSearchQuery(res.data))
    dispatch(setTotalItems(res.headers['x-total-count']))
  })
  dispatch(setQuery(searchValue))
}
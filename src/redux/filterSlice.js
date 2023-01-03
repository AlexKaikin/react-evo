import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categories: [
    { id: 1, title: 'Все чаи', type: 'all' }, 
    { id: 2, title: 'Красные', type: 'red' }, 
    { id: 3, title: 'Зелёные', type: 'green' }, 
    { id: 4, title: 'Белые', type: 'white' },
  ],
  categoryActive: 'all',
  
  sortingItems: [
    { id: 1, title: 'новые', type: 'new' }, 
    { id: 2, title: 'популярные', type: 'pop' }, 
    { id: 3, title: 'убывание цены', type: 'priceDecrease' }, 
    { id: 4, title: 'возрастание цены', type: 'priceIncrease' },
  ],
  sortActive: 'new',
}

export const productsFilterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryActive: (state, action) => {
      state.categoryActive = action.payload
    },
    setSortActive: (state, action) => {
      state.sortActive = action.payload
    },
  },
})

// Action
export const { setCategoryActive, setSortActive } = productsFilterSlice.actions

export default productsFilterSlice.reducer

// Selector
export const filterSelector = state => state.filter

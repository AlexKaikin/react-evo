import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

const initialState: FilterType = {
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
    setCategoryActive: (state, action: PayloadAction<string>) => {
      state.categoryActive = action.payload
    },
    setSortActive: (state, action: PayloadAction<string>) => {
      state.sortActive = action.payload
    },
  },
})

// Action
export const { setCategoryActive, setSortActive } = productsFilterSlice.actions

export default productsFilterSlice.reducer

// Selector
export const filterSelector = (state: RootState) => state.filter

interface FilterType {
  categories: CategoryType[],
  categoryActive: string,
  sortingItems: SortType[],
  sortActive: string,
}

type CategoryType = {
  id: number,
  title: string,
  type: string,
}

type SortType = {
  id: number,
  title: string,
  type: string,
}

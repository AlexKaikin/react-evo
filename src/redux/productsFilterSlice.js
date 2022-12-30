import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categories: [
    { id: 1, title: 'Все чаи', type: 'all', isActive: true }, 
    { id: 2, title: 'Красные', type: 'red', isActive: false }, 
    { id: 3, title: 'Зелёные', type: 'green', isActive: false }, 
    { id: 4, title: 'Белые', type: 'white', isActive: false },
  ],
  sortingItems: [
    { id: 1, title: 'новые', type: 'new', isActive: true }, 
    { id: 2, title: 'популярные', type: 'pop', isActive: false }, 
    { id: 3, title: 'убывание цены', type: 'priceDecrease', isActive: false }, 
    { id: 4, title: 'возрастание цены', type: 'priceIncrease', isActive: false },
  ],
}

export const productsFilterSlice = createSlice({
  name: 'productsFilter',
  initialState,
  reducers: {
    setCategoryActive: (state, action) => {
      const changeCategoryArray = () => {
        return state.categories.map(item => {
            if(item.title === action.payload){
                return {...item, isActive: true}
            }
            return {...item, isActive: false}
        })
      }

      return {
        ...state,
        categories: changeCategoryArray()
      }
    },
    setSortActive: (state, action) => {
      const changeSortArray = () => {
        return state.sortingItems.map(item => {
            if(item.title === action.payload){
                return {...item, isActive: true}
            }
            return {...item, isActive: false}
        })
      }

      return {
        ...state,
        sortingItems: changeSortArray()
      }
    },
  },
})

// Action
export const { setCategoryActive, setSortActive } = productsFilterSlice.actions

export default productsFilterSlice.reducer
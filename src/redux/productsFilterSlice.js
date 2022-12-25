import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  category: [
    { id: 1, title: 'Все', type: 'null', isActive: true }, 
    { id: 2, title: 'Красные', type: 'red', isActive: false }, 
    { id: 3, title: 'Зелёные', type: 'green', isActive: false }, 
    { id: 4, title: 'Белые', type: 'white', isActive: false },
  ],
  sort: [
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
        return state.category.map(item => {
            if(item.title === action.payload){
                return {...item, isActive: true}
            }
            return {...item, isActive: false}
        })
      }

      return {
        ...state,
        category: changeCategoryArray()
      }
    },
    setSortActive: (state, action) => {
      const changeSortArray = () => {
        return state.sort.map(item => {
            if(item.title === action.payload){
                return {...item, isActive: true}
            }
            return {...item, isActive: false}
        })
      }

      return {
        ...state,
        sort: changeSortArray()
      }
    },
  },
})

// Action
export const { setCategoryActive, setSortActive } = productsFilterSlice.actions

export default productsFilterSlice.reducer
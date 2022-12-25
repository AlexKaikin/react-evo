import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  compareItems: [],
}

export const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      return {
        ...state,
        compareItems: action.payload || [],
      }
    },
  },
})

// Action
export const { setProducts } = compareSlice.actions

export default compareSlice.reducer

// thunk
export const getCompare = () => dispatch => {
  dispatch(setProducts(JSON.parse(localStorage.getItem('compare'))))
}
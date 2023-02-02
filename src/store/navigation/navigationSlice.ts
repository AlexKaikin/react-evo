import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { navigationhAPI } from '../../api/api'
import { RootState } from '../store'

const initialState: NavigationType = {
  navigation: [],
  categoryActive: 'Все чаи',
  sortActive: 'new',
  status: 'loading', // loading, success, error
}

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setCategoryActive: (state, action: PayloadAction<string>) => {
      state.categoryActive = action.payload
    },
    setSortActive: (state, action: PayloadAction<string>) => {
      state.sortActive = action.payload
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload
    },
    setNavigation: (state, action: PayloadAction<NavigationItemType[]>) => {
      state.navigation = action.payload
      state.status = 'success'
    },
  },
})

// Action
export const { setCategoryActive, setSortActive, setStatus, setNavigation } =
  navigationSlice.actions

export default navigationSlice.reducer

// Selector
export const navigationSelector = (state: RootState) => state.navigation

// thunk
// загрузка навигации
export const getNavigation = () => async (dispatch: Function) => {
  dispatch(setStatus('loading'))

  try {
    const res = await navigationhAPI.getNavigation()
    dispatch(setNavigation(res.data))
  } catch (err) {
    dispatch(setStatus('error'))
    console.log(err)
  }
}

interface NavigationType {
  navigation: NavigationItemType[]
  categoryActive: string
  sortActive: string
  status: string
}

export type NavigationItemType = {
  id: number
  title: string
  url: string
  filter: CategoryItemType[]
  sort: SortItemType[]
}

export type CategoryItemType = {
  id: number
  title: string
  type: string
}

export type SortItemType = {
  id: number
  title: string
  type: string
}

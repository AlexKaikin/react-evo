import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authAPI } from '../api/api'
import { RootState } from './store'

const initialState: AuthType = {
  data: null,
  status: 'loading', // loading, success, error
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null
    },
    setLogin: (state, action: PayloadAction<AuthDataType>) => {
      state.data = action.payload
      state.status = 'success'
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload
    },
  },
})

export type AuthType = {
  data: null | AuthDataType
  status: string
}

export type AuthDataType = {
  _id: string
  fullName: string
  email: string
  role: string
  createdAt: string
  updatedAt: string
  __v: number
}

// Action
export const { setLogin, setStatus, logout } = authSlice.actions

export default authSlice.reducer

//Selector
export const authSelector = (state: RootState) => state.auth

// thunk
export const register =
  (values: RegisterType) => async (dispatch: Function) => {
    dispatch(setStatus('loading'))
    try {
      const res = await authAPI.register(values)
      dispatch(setLogin(res.data))
      window.localStorage.setItem('token', res.data.token)
    } catch (err) {
      dispatch(setStatus('error'))
      console.log(err)
    }
  }

export const login = (values: LoginType) => async (dispatch: Function) => {
  dispatch(setStatus('loading'))
  try {
    const res = await authAPI.login(values)
    dispatch(setLogin(res.data))
    window.localStorage.setItem('token', res.data.token)
  } catch (err) {
    dispatch(setStatus('error'))
    console.log(err)
  }
}

export const authMe = () => async (dispatch: Function) => {
  dispatch(setStatus('loading'))
  try {
    const res = await authAPI.getMe()
    dispatch(setLogin(res.data))
  } catch (err) {
    dispatch(setStatus('error'))
    console.log(err)
  }
}

export type RegisterType = {
  fullName: string
  email: string
  password: string
}

export type LoginType = {
  email: string
  password: string
}

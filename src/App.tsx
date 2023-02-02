import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import Footer from './components/layout/Footer/Footer'
import Header from './components/layout/Header/Header'
import Main from './components/layout/Main/Main'
import { authMe, authSelector } from './store/account/authSlice'
import {
  getNavigation,
  navigationSelector,
} from './store/navigation/navigationSlice'
import { useAppDispatch } from './store/store'

const App = () => {
  const dispatch = useAppDispatch()
  const { status } = useSelector(navigationSelector)
  const auth = useSelector(authSelector)

  useEffect(() => {
    dispatch(getNavigation())
    dispatch(authMe())
  }, [dispatch])

  if (status === 'loading' || auth.status === 'loading') return null

  return (
    <BrowserRouter>
      <Header />
      <Main />
      <Footer />
    </BrowserRouter>
  )
}

export default App

import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'

import Footer from './components/layout/Footer/Footer'
import Header from './components/layout/Header/Header'
import Main from './components/layout/Main/Main'
import { authMe } from './store/account/authSlice'
import { getNavigation } from './store/navigation/navigationSlice'
import { useAppDispatch } from './store/store'

const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getNavigation())
    dispatch(authMe())
  }, [dispatch])

  return (
    <BrowserRouter>
      <Header />
      <Main />
      <Footer />
    </BrowserRouter>
  )
}

export default App

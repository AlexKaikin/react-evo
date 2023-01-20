import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import Footer from './components/layout/Footer/Footer'
import Header from './components/layout/Header/Header'
import Main from './components/layout/Main/Main'
import { getNavigation, navigationSelector } from './redux/navigationSlice'
import { useAppDispatch } from './redux/store'


const App = () => {
  const dispatch = useAppDispatch()
  const { status } = useSelector(navigationSelector)

  useEffect(() => {
    dispatch(getNavigation())
  }, [dispatch])

  if(status === 'loading') return null

  return  <BrowserRouter>
            <Header />
            <Main />
            <Footer />
          </BrowserRouter>
}

export default App

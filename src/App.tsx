import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'

import Footer from './components/layout/Footer/Footer'
import Header from './components/layout/Header/Header'
import Main from './components/layout/Main/Main'
import { getNavigation } from './redux/navigationSlice'
import { useAppDispatch } from './redux/store'


const App = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getNavigation())
  }, [dispatch])
  return  <BrowserRouter>
            <Header />
            <Main />
            <Footer />
          </BrowserRouter>
}

export default App

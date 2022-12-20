import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Footer from './components/tempalates/layout/Footer/Footer'
import Header from './components/tempalates/layout/Header/Header'
import Main from './components/tempalates/layout/Main/Main'


function App() {
  
  return  <BrowserRouter>
            <Header />
            <Main />
            <Footer />
          </BrowserRouter>
}

export default App

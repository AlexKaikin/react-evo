import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

import Footer from './components/tempalates/layout/Footer/Footer';
import Header from './components/tempalates/layout/Header/Header';
import Main from './components/tempalates/layout/Main/Main';
import { useDispatch } from 'react-redux';
import { setProducts } from './redux/productsSlice';



function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    axios.get('http://localhost:3000/products.json')
      .then(res => dispatch(setProducts(res.data.products)))
  }, [dispatch])

  return  <BrowserRouter>
            <Header />
            <Main />
            <Footer />
          </BrowserRouter>
}

export default App;

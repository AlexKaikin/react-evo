import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

import Footer from './components/tempalates/layout/Footer/Footer';
import Header from './components/tempalates/layout/Header/Header';
import Main from './components/tempalates/layout/Main/Main';



function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/products.json')
      .then(res => setProducts(res.data.products))
  }, [])

  return  <BrowserRouter>
            <Header />
            <Main products={products} />
            <Footer />
          </BrowserRouter>
}

export default App;

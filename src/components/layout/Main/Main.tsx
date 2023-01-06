import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'


const   Products =      React.lazy(() => import('../../pages/Products/Products')),
        Product =       React.lazy(() => import('../../pages/Products/Products/Product/Product')),
        Posts =         React.lazy(() => import('../../pages/Posts/Posts')),
        Cart =          React.lazy(() => import('../../pages/store/Cart/Cart')),
        Compare =       React.lazy(() => import('../../pages/store/Compare/Compare')),
        Favorites =     React.lazy(() => import('../../pages/store/Favorites/Favorites')),
        Contacts =      React.lazy(() => import('../../pages/Contacts/Contacts')),
        Login =         React.lazy(() => import('../../pages/Auth/Login/Login')),
        Register =      React.lazy(() => import('../../pages/Auth/Register/Register')),
        Search =        React.lazy(() => import('../../pages/Search/Search')),
        NotFound =      React.lazy(() => import('../../pages/NotFound/NotFound'))
        


const Main: React.FC = props => {
    return  <main className='main'>
                <Suspense fallback={<div className='container'>Загрузка...</div>}>
                    <Routes>
                        <Route path='/' element={<Navigate to='/products' />} />
                        
                        <Route path='/products' element={<Products />} />
                        <Route path='/products/:id' element={<Product />} />

                        <Route path='/cart' element={<Cart />} />
                        <Route path='/favorites' element={<Favorites />} />
                        <Route path='/compare' element={<Compare />} />

                        <Route path='/posts' element={<Posts />} />

                        <Route path='/contacts' element={<Contacts />} />

                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        
                        <Route path='/search' element={<Search />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </Suspense>
            </main>
}

export default Main
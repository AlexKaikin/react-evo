import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'


const   Products =      React.lazy(() => import('../../pages/Products/Products')),
        Product =       React.lazy(() => import('../../pages/Products/Product/Product')),
        Cart =          React.lazy(() => import('../../pages/Cart/Cart')),
        Compare =       React.lazy(() => import('../../pages/Compare/Compare')),
        Favorites =       React.lazy(() => import('../../pages/Favorites/Favorites')),
        Contacts =      React.lazy(() => import('../../pages/Contacts/Contacts')),
        Login =         React.lazy(() => import('../../pages/Login/Login')),
        Register =      React.lazy(() => import('../../pages/Register/Register')),
        NotFound =      React.lazy(() => import('../../pages/NotFound/NotFound'))
        


const Main = props => {
    return  <main className='main'>
                <Suspense fallback={<div className='container'>Загрузка...</div>}>
                    <Routes>
                        <Route exact path='/' element={<Navigate to='/products' />} />
                        <Route exact path='/products' element={<Products />} />
                        <Route exact path='/products/:id' element={<Product />} />
                        <Route exact path='/cart' element={<Cart />} />
                        <Route exact path='/favorites' element={<Favorites />} />
                        <Route exact path='/compare' element={<Compare />} />
                        <Route exact path='/contacts' element={<Contacts />} />
                        <Route exact path='/login' element={<Login />} />
                        <Route exact path='/register' element={<Register />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </Suspense>
            </main>
}

export default Main
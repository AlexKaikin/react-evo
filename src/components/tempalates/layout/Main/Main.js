import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'


const   Products =  React.lazy(() => import('../../pages/Products/Products')),
        Product =  React.lazy(() => import('../../pages/Products/Product/Product')),
        Contacts = React.lazy(() => import('../../pages/Contacts/Contacts')),
        Login = React.lazy(() => import('../../pages/Login/Login')),
        Register = React.lazy(() => import('../../pages/Register/Register')),
        NotFound = React.lazy(() => import('../../pages/NotFound/NotFound'))
        


const Main = props => {
    return  <main className='main'>
                <Suspense fallback={<div className='container'>Загрузка...</div>}>
                    <Routes>
                        <Route path='/' element={<Navigate to='/products' />} />
                        <Route path='/products' element={<Products />} />
                        <Route path='/products/:id' element={<Product />} />
                        <Route path='/contacts' element={<Contacts />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </Suspense>
            </main>
}

export default Main
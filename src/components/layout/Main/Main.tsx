import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const Products = React.lazy(
    () => import('../../pages/Products/Products/Products')
  ),
  Product = React.lazy(() => import('../../pages/Products/Product/Product')),
  Posts = React.lazy(() => import('../../pages/Posts/Posts')),
  Cart = React.lazy(() => import('../../pages/Products/Cart/Cart')),
  Compare = React.lazy(() => import('../../pages/Products/Compare/Compare')),
  Favorites = React.lazy(
    () => import('../../pages/Products/Favorites/Favorites')
  ),
  Contacts = React.lazy(() => import('../../pages/Contacts/Contacts')),
  Login = React.lazy(() => import('../../pages/account/Login/Login')),
  Register = React.lazy(() => import('../../pages/account/Register/Register')),
  Profile = React.lazy(() => import('../../pages/account/Profile/Profile')),
  Orders = React.lazy(() => import('../../pages/account/Orders/Orders')),
  Dashboard = React.lazy(() => import('../../pages/Admin/Dashboard/Dashboard')),
  AdminProducts = React.lazy(() => import('../../pages/Admin/Products/Products')),
  AdminOrders = React.lazy(() => import('../../pages/Admin/Orders/Orders')),
  AdminMessages = React.lazy(() => import('../../pages/Admin/Messages/Messages')),
  NotFound = React.lazy(() => import('../../pages/NotFound/NotFound'))

const Main: React.FC = (props) => {
  return (
    <main className="main">
      <Suspense>
        <Routes>
          <Route path="/" element={<Navigate to="/products" />} />

          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Product />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/compare" element={<Compare />} />

          <Route path="/posts" element={<Posts />} />

          <Route path="/contacts" element={<Contacts />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />

          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/messages" element={<AdminMessages />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </main>
  )
}

export default Main

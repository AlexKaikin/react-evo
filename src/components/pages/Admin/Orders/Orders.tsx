import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  getOrdersAdmin,
  ordersAdminSelector,
  setCurrentPage,
} from '../../../../store/admin/products/ordersAdminSlice'
import { useAppDispatch } from '../../../../store/store'
import Pagination from '../../../common/Pagination/Pagination'
import Aside from '../../../layout/Aside/admin/Aside'
import OrderItems from './OrderItems/OrderItems'
import './Orders.scss'

const Orders: React.FC = (props) => {
  const dispatch = useAppDispatch()
  const { orderItems, pagesCount, currentPage } = useSelector(ordersAdminSelector)
  const currentPageChange = (number: number) => dispatch(setCurrentPage(number))

  useEffect(() => {
    dispatch(getOrdersAdmin())
  }, [dispatch])
  return (
    <div className="two">
      <Aside />
      <div className="section orders">
        <div className="container">
          <OrderItems orderItems={orderItems} />
          <Pagination
            pagesCount={pagesCount}
            currentPage={currentPage}
            currentPageChange={currentPageChange}
          />
        </div>
      </div>
    </div>
  )
}

export default Orders

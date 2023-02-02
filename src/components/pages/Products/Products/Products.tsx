import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import {
  getProducts,
  productsSelector,
  setCurrentPage,
} from '../../../../store/products/productsSlice'
import Pagination from '../../../common/Pagination/Pagination'
import { navigationSelector } from '../../../../store/navigation/navigationSlice'
import { useAppDispatch } from '../../../../store/store'
import './Products.scss'
import Filter from '../../../common/Filter/Filter'
import Cloud from '../../../layout/Cloud/Product/Cloud'
import ProductItems from './ProductItems/ProductItems'

const Products: React.FC = (props) => {
  const dispatch = useAppDispatch()
  const { productItems, currentPage, pagesCount, status, query } =
    useSelector(productsSelector)
  const { navigation, categoryActive, sortActive } =
    useSelector(navigationSelector)
  const categories =
    navigation.find((item) => item.url === '/products')?.filter || []
  const sortingItems =
    navigation.find((item) => item.url === '/products')?.sort || []

  const currentPageChange = (number: number) => dispatch(setCurrentPage(number)) // пагинация, смена страницы

  useEffect(() => {
    dispatch(getProducts(categoryActive, sortActive, currentPage))
    window.scrollTo(0, 0)
  }, [dispatch, categoryActive, sortActive, currentPage, query])

  return (
    <>
      <Cloud />
      <Filter
        categories={categories}
        categoryActive={categoryActive}
        sortingItems={sortingItems}
        sortActive={sortActive}
      />
      <div className="section products">
        <div className="container">
          <ProductItems items={productItems} status={status} />
          <Pagination
            pagesCount={pagesCount}
            currentPage={currentPage}
            currentPageChange={currentPageChange}
          />
        </div>
      </div>
    </>
  )
}

export default Products

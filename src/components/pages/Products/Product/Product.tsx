import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  getProduct,
  productsSelector,
} from '../../../../store/products/productsSlice'
import { useAppDispatch } from '../../../../store/store'
import ProductFullSkeleton from '../../../common/Skeleton/ProductFullSkeleton/ProductFullSkeleton'
import './Product.scss'
import Cloud from '../../../layout/Cloud/Product/Cloud'
import FullProduct from './FullProduct/FullProduct'

const Product: React.FC = (props) => {
  const { productItem, status } = useSelector(productsSelector) // получить товар, индикатор загрузки
  const dispatch = useAppDispatch()
  const productId: string | undefined = useParams().id // получить id товара из url

  useEffect(() => {
    if (productId !== undefined) dispatch(getProduct(+productId)) // получить товар
    window.scrollTo(0, 0)
  }, [dispatch, productId])

  if (status === 'error') {
    return (
      <>
        <Cloud />
        <div className="section product">
          <div className="section__title">Произошла ошибка</div>
          <p>К сожалению, не удалось загрузить товар</p>
        </div>
      </>
    )
  }

  if (
    productItem === null ||
    (productId !== undefined && +productId !== productItem.id)
  ) {
    return (
      <>
        <Cloud />
        <ProductFullSkeleton />
      </>
    )
  }

  return (
    <>
      <Cloud />
      <FullProduct productItem={productItem} />
    </>
  )
}

export default Product

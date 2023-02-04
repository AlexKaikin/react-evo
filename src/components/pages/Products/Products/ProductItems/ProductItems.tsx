import React from 'react'
import { Link } from 'react-router-dom'
import { ProductItemType } from '../../../../../store/products/productsSlice'
import ProductSkeleton from '../../../../common/Skeleton/ProductSkeleton/ProductSkeleton'

const ProductItems: React.FC<PropsType> = ({ items, status }) => {
  if (status === 'error') {
    return (
      <>
        <div className="section__title">Произошла ошибка</div>
        <p>К сожалению, не удалось загрузить товары</p>
      </>
    )
  }

  if (status === 'loading') {
    return (
      <div className="products__items product">
        {Array(8)
          .fill('item')
          .map((item, i) => (
            <ProductSkeleton key={i} />
          ))}
      </div>
    )
  }

  if(!items.length) return <div>Товаров нет</div>

  return (
    <div className="products__items product">
      {items?.map((item) => {
        return (
          <Link
            to={`/products/${item.id}`}
            key={item.id}
            className="product__item"
          >
            <div className="product__img">
              <img
                src={(process.env.REACT_APP_SERVER_URL || '') + item.imgUrl}
                alt={`${item.title} фото`}
              />
            </div>
            <div className="product__title">{item.title}</div>
            <div className="product__price">
              {item.price} {item.currency}/{item.volume}{' '}
              {item.volumeMeasurement}
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default ProductItems

type PropsType = {
  items: ProductItemType[]
  status: string
}

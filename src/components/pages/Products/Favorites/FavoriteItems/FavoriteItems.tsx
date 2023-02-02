import React from 'react'
import { Link } from 'react-router-dom'
import { FavoriteItemType } from '../../../../../store/products/storeSlice'

const FavoriteItems: React.FC<PropsType> = ({ favoritesItems }) => {
  if (!favoritesItems.length) return <div>Товаров нет</div>

  return (
    <div className="products__items product">
      {favoritesItems?.map((item) => (
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
          <div className="product__price">{item.price} руб./100 грамм</div>
        </Link>
      ))}
    </div>
  )
}

export default FavoriteItems

type PropsType = {
  favoritesItems: FavoriteItemType[]
}

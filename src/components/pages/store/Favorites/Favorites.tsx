import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Store from '../../../layout/Store/Store'
import { FavoriteItemType, storeSelector } from '../../../../store/storeSlice'

const Favorites: React.FC = (props) => {
    const { favoritesItems } = useSelector(storeSelector)

    return (
        <>
            <Store />
            <div className="section products">
                <div className="container">
                    <div className="section__title">Избранные товары</div>
                    <div className="products__items product">
                        {favoritesItems.length > 0 ? (
                            <ProductItems favoritesItems={favoritesItems} />
                        ) : (
                            <div className="cart__items">Товаров нет</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Favorites

const ProductItems: React.FC<PropsType> = (props) => {
    return (
        <>
            {props.favoritesItems?.map((item) => {
                return (
                    <Link
                        to={`/products/${item.id}`}
                        key={item.id}
                        className="product__item"
                    >
                        <div className="product__img">
                            <img src={item.imgUrl} alt="" />
                        </div>
                        <div className="product__title">{item.title}</div>
                        <div className="product__price">
                            {item.price} руб./100 грамм
                        </div>
                    </Link>
                )
            })}
        </>
    )
}

type PropsType = {
    favoritesItems: FavoriteItemType[]
}

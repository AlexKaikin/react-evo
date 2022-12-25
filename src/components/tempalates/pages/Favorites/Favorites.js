import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Store from '../../layout/Store/Store'
import imgDefault from '../../../../static/img/products/no.jpg'


const Favorites = props => {
    const productItems = useSelector(state => state.favorites.favoritesItems)

    return  <>
                <Store />
                <div className='section products'>
                    <div className='container'>
                        <div className='section__title'>Избранные товары</div>
                        <div className='products__items product'>
                        {
                            productItems.length > 0
                                ? <ProductItems productItems={productItems} />
                                : <div className='cart__items'>Нет товаров</div>
                        }
                        </div>
                    </div>
                </div>
            </>
}

export default Favorites

const ProductItems = props => {
    return  props.productItems?.map(item => {
                return  <div key={item.id} className='product__item'>
                            <div className='product__img'><img src={item.imgUrl ? item.imgUrl : imgDefault} alt='' /></div>
                            <div className='product__title'><Link to={`/products/${item.id}`}>{item.title}</Link></div>
                            <div className='product__price'>{item.price} руб./100 грамм</div>
                        </div>
                    
            }) 
}

import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Store from '../../layout/Store/Store'
import imgDefault from '../../../../static/img/products/1.jpg'


const Products = props => {
    const categoryItems = ['Все', 'Красные', 'Зелёные', 'Белые']
    const productItems = [
        {
            id: 1,
            img: '',
            title: 'Шу Пуэр',
            price: '500',
        },
        {
            id: 2,
            img: '',
            title: 'Шу Пуэр',
            price: '500',
        },
        {
            id: 3,
            img: '',
            title: 'Шу Пуэр',
            price: '500',
        },
        {
            id: 4,
            img: '',
            title: 'Шу Пуэр',
            price: '500',
        }
    ]

    const [categoryActive, setCategoryActive] = useState('Все')

    const changeCategory = (e) => {
        setCategoryActive(e.currentTarget.innerText)
    }

    return  <>
                <Store />
                <div className='section filter'>
                    <div className='container'>
                        <CategoryItems 
                            categoryItems={categoryItems} 
                            changeCategory={changeCategory} 
                            categoryActive={categoryActive}/>
                        <div className='filter__sort'>
                            Сортировать по <span>популярности</span>
                        </div>
                    </div>
                </div>
                <div className='section products'>
                    <div className='container'>
                        <div className='products__items product'>
                            <ProductItems productItems={productItems} />
                        </div>
                    </div>
                </div>
            </>
}

export default Products

const CategoryItems = props => {
    return  <div className='filter__category'>
                { 
                    props.categoryItems?.map(item => {
                        return  <button 
                                    key={item}
                                    onClick={props.changeCategory}
                                    className={ (props.categoryActive === item) ? 'btn active' : 'btn'}>{item}</button>
                    }) 
                }
            </div>
}

const ProductItems = props => {
    return  props.productItems?.map(item => {
                return  <div key={item.id} className='product__item'>
                            <div className='product__img'><img src={item.img ? item.img : imgDefault} alt='' /></div>
                            <div className='product__title'><Link to={`/products/${item.id}`}>{item.title}</Link></div>
                            <div className='product__price'>{item.price} руб./100 грамм</div>
                        </div>
                    
            }) 
}
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import Store from '../../layout/Store/Store'
import imgDefault from '../../../../static/img/products/1.jpg'


const Products = props => {
    const productsCategoryItems = ['Все', 'Красные', 'Зелёные', 'Белые']
    const productsSortItems = ['новые', 'популярные', 'убывание цены', 'возрастание цены']
    const productItems = props.products

    return  <>
                <Store />
                <div className='section filter'>
                    <div className='container'>
                        <ProductsCategory productsCategoryItems={productsCategoryItems}/>
                        <ProductsSort productsSortItems={productsSortItems} />
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

const ProductItems = props => {
    return  props.productItems?.map(item => {
                return  <div key={item.id} className='product__item'>
                            <div className='product__img'><img src={item.img ? item.img : imgDefault} alt='' /></div>
                            <div className='product__title'><Link to={`/products/${item.id}`}>{item.title}</Link></div>
                            <div className='product__price'>{item.price} руб./100 грамм</div>
                        </div>
                    
            }) 
}

const ProductsCategory = props => {
    const [categoryActive, setCategoryActive] = useState(props.productsCategoryItems[0])

    const changeCategory = (e) => {
        setCategoryActive(e.currentTarget.innerText)
    }

    return  <div className='filter__category'>
                { 
                    props.productsCategoryItems?.map(item => {
                        return  <button 
                                    key={item}
                                    className={ (categoryActive === item) ? 'btn active' : 'btn'}
                                    onClick={changeCategory}>{item}</button>
                    }) 
                }
            </div>
}

const ProductsSort = props => {
    const [sortShow, setSortShow] = useState(false)

    const sortShowChange = () => {
        if(sortShow){
            setSortShow(false)
            document.body.removeEventListener('click', bodyClick)
        } else {
            setSortShow(true)
            document.body.addEventListener('click', bodyClick)
        }
    }

    const [sortActive, setSortActive] = useState(props.productsSortItems[0])

    const changeSort = (e) => {
        setSortActive(e.currentTarget.innerText)
        setSortShow(false)
        document.body.removeEventListener('click', bodyClick)
    }

    const bodyClick = (e) => {
        if(!e.path.includes(sortRef.current)) {
            setSortShow(false)
            document.body.removeEventListener('click', bodyClick)
        }
    }

    const sortRef = useRef()

    return  <div ref={sortRef} className='filter__sort sort'>
                Сортировка: <button onClick={sortShowChange}>{sortActive}</button>

                <div className={sortShow ? 'sort__items show' : 'sort__items'}>
                    { 
                        props.productsSortItems?.map(item => {
                            return  <button key={item} onClick={changeSort}>{item}</button>
                        }) 
                    }
                </div>
            </div>
}
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ContentLoader from 'react-content-loader'

import Store from '../../layout/Store/Store'
import { setCategoryActive, setSortActive } from '../../../../redux/productsFilterSlice'
import { getProducts, setCurrentPage } from '../../../../redux/productsSlice'
import Pagination from '../../../common/Pagination/Pagination'


const Products = props => {
    const dispatch = useDispatch()
    const prodactsState = useSelector(state => state.products)

    const { productItems, isLoaded } = prodactsState

    const productsCategoryItems = useSelector(state => state.productsFilter.category)
    const productsSortItems = useSelector(state => state.productsFilter.sort)

    // пагинация
    const { currentPage, totalItems, limitItems } = prodactsState
    const pagesCount = Math.ceil(totalItems / limitItems)
    const currentPageChange = (number) => dispatch(setCurrentPage(number))

    // активная категория
    const categoryActive = productsCategoryItems?.find(item => item.isActive).type
    // смена категории
    const changeCategory = (e) => {
        dispatch(setCurrentPage(1))
        dispatch(setCategoryActive(e.currentTarget.innerText))
    }

    const sortActive = productsSortItems?.find(item => item.isActive).type
    
    useEffect(() => {
        dispatch(getProducts(categoryActive, sortActive, currentPage, limitItems))
        window.scrollTo(0, 0)
    }, [dispatch, categoryActive, sortActive, currentPage, limitItems])

    return  <>
                <Store />
                <div className='section filter'>
                    <div className='container'>
                        <ProductsCategory productsCategoryItems={productsCategoryItems} changeCategory={changeCategory} />
                        <ProductsSort productsSortItems={productsSortItems}/>
                    </div>
                </div>
                <div className='section products'>
                    <div className='container'>
                        <div className='products__items product'>
                            <ProductItems productItems={productItems} isLoaded={isLoaded} />
                        </div>
                        <Pagination pagesCount={pagesCount} currentPage={currentPage} currentPageChange={currentPageChange} />
                    </div>
                </div>
            </>
}

export default Products

const ProductItems = props => {
    if(!props.isLoaded) return props.productItems.map(item => <ProductsLoader key={item.id} />)

    return  props.productItems?.map(item => {
                return  <div key={item.id} className='product__item'>
                            <div className='product__img'><img src={item.imgUrl} alt={`${item.imgUrl} фото`} /></div>
                            <div className='product__title'><Link to={`/products/${item.id}`}>{item.title}</Link></div>
                            <div className='product__price'>{item.price} {item.currency}/{item.volume} {item.volumeMeasurement}</div>
                        </div>
            }) 
}

const ProductsCategory = props => {
    return  <div className='filter__category'>
                { 
                    props.productsCategoryItems?.map(item => {
                        return  <button 
                                    key={item.id}
                                    className={ (item.isActive) ? 'btn active' : 'btn'}
                                    onClick={props.changeCategory}>{item.title}</button>
                    }) 
                }
            </div>
}

const ProductsSort = props => {
    const sortRef = useRef()
    const dispatch = useDispatch()
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

    const changeSort = (e) => {
        dispatch(setSortActive(e.currentTarget.innerText))
        setSortShow(false)
        document.body.removeEventListener('click', bodyClick)
    }

    const bodyClick = (e) => {
        const path = e.path || (e.composedPath && e.composedPath()) // for firefox browser
        if(!path.includes(sortRef.current)) {
            setSortShow(false)
            document.body.removeEventListener('click', bodyClick)
        }
    }

    return  <div ref={sortRef} className='filter__sort sort'>
                Сортировка: <button onClick={sortShowChange}>
                        { props.productsSortItems?.map(item => item.isActive && item.title) }
                        {/* { props.productsSortItems?.find(item => item.isActive).title } */}
                    </button>

                <div className={sortShow ? 'sort__items show' : 'sort__items'}>
                    { 
                        props.productsSortItems?.map(item => {
                            return  <button key={item.id} onClick={changeSort}>{item.title}</button>
                        }) 
                    }
                </div>
            </div>
}

const ProductsLoader = (props) => (
    <ContentLoader 
      speed={2}
      width={175}
      height={175}
      viewBox="0 0 175 175"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <circle cx="87" cy="62" r="60" /> 
      <rect x="27" y="138" rx="5" ry="5" width="118" height="23" />
    </ContentLoader>
  )
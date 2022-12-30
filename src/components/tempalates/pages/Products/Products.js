import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ContentLoader from 'react-content-loader'

import Store from '../../layout/Store/Store'
import { getProducts, setCurrentPage } from '../../../../redux/productsSlice'
import Pagination from '../../common/Pagination/Pagination'
import Categories from '../../common/Categories/Categories'
import Sorting from '../../common/Sorting/Sorting'


const Products = props => {
    const dispatch = useDispatch()
    const { productItems, isLoaded, currentPage, totalItems, limitItems } = useSelector(state => state.products)
    const { categories, sortingItems } = useSelector(state => state.productsFilter)

    // пагинация
    const pagesCount = Math.ceil(totalItems / limitItems)
    const currentPageChange = (number) => dispatch(setCurrentPage(number))

    // активная категория
    const categoryActive = categories?.find(item => item.isActive).type
    
    // активная сортировка
    const sortActive = sortingItems?.find(item => item.isActive).type
    
    useEffect(() => {
        dispatch(getProducts(categoryActive, sortActive, currentPage, limitItems))
        window.scrollTo(0, 0)
    }, [dispatch, categoryActive, sortActive, currentPage, limitItems])

    return  <>
                <Store />
                <div className='section filter'>
                    <div className='container'>
                        <Categories items={categories} />
                        <Sorting items={sortingItems}/>
                    </div>
                </div>
                <div className='section products'>
                    <div className='container'>
                        <ProductItems productItems={productItems} isLoaded={isLoaded} />
                        <Pagination pagesCount={pagesCount} currentPage={currentPage} currentPageChange={currentPageChange} />
                    </div>
                </div>
            </>
}

export default Products

const ProductItems = props => {
    if(!props.isLoaded) return props.productItems.map(item => <ProductsLoader key={item.id} />)

    return  <div className='products__items product'>
                {
                    props.productItems?.map(item => {
                        return  <div key={item.id} className='product__item'>
                                    <div className='product__img'><img src={item.imgUrl} alt={`${item.imgUrl} фото`} /></div>
                                    <div className='product__title'><Link to={`/products/${item.id}`}>{item.title}</Link></div>
                                    <div className='product__price'>{item.price} {item.currency}/{item.volume} {item.volumeMeasurement}</div>
                                </div>
                    }) 
                }
            
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
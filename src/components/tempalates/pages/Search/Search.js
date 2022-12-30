import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ContentLoader from 'react-content-loader'

import Store from '../../layout/Store/Store'
import imgDefault from '../../../../static/img/products/no.jpg'
//import { setCategoryActive, setSortActive } from '../../../../redux/productsFilterSlice'
import { getSearchProducts } from '../../../../redux/searchProductsSlice'


const Search = props => {
    //const productsCategoryItems = useSelector(state => state.productsFilter.category)
    //const productsSortItems = useSelector(state => state.productsFilter.sort)
    const { items, isLoaded, query } = useSelector(state => state.search)

    //const categoryActive = productsCategoryItems?.find(item => item.isActive).type
    //const sortActive = productsSortItems?.find(item => item.isActive).type

    // const searchValue = document.location
    // console.log(searchValue)
    
    const dispatch = useDispatch()
    const searchValue = new URLSearchParams(useLocation().search).get('q')

    useEffect(() => {
        !query && dispatch(getSearchProducts(searchValue))
    }, [dispatch, searchValue, query])

    return  <>
                <Store />
                <div className='section filter'>
                    <div className='container'>
                        {/* <ProductsCategory productsCategoryItems={productsCategoryItems} />
                        <ProductsSort productsSortItems={productsSortItems}/> */}
                    </div>
                </div>
                <div className='section products'>
                    <div className='container'>
                        <div className='section__title'>Результаты поиска по запросу «{query}»</div>
                        <div className='products__items product'>
                            <SearchItems items={items} isLoaded={isLoaded} />
                        </div>
                    </div>
                </div>
            </>
}

export default Search

const SearchItems = props => {
    
    if(!props.isLoaded) return props.items.map(item => <ProductsLoader key={item.id} />)

    return  props.items?.map(item => {
                return  <div key={item.id} className='product__item'>
                            <div className='product__img'><img src={item.imgUrl ? item.imgUrl : imgDefault} alt='' /></div>
                            <div className='product__title'><Link to={`/products/${item.id}`}>{item.title}</Link></div>
                            <div className='product__price'>{item.price} {item.currency}/{item.volume} {item.volumeMeasurement}</div>
                        </div>
                    
            }) 
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
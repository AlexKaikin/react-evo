import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ContentLoader from 'react-content-loader'

import Store from '../../layout/Store/Store'
import { getProducts, productsSelector, setCurrentPage } from '../../../../redux/productsSlice'
import Pagination from '../../common/Pagination/Pagination'
import Categories from '../../common/Categories/Categories'
import Sorting from '../../common/Sorting/Sorting'
import { filterSelector } from '../../../../redux/filterSlice'
import { useAppDispatch } from '../../../../redux/store'


const Products: React.FC = props => {
    const dispatch = useAppDispatch()
    const { productItems, isLoaded, currentPage, pagesCount, error } = useSelector(productsSelector)
    const { categories, categoryActive, sortingItems, sortActive } = useSelector(filterSelector)

    // пагинация, смена страницы
    const currentPageChange = (number: number) => dispatch(setCurrentPage(number))
    
    useEffect(() => {
        dispatch(getProducts(categoryActive, sortActive, currentPage))
        window.scrollTo(0, 0)
    }, [dispatch, categoryActive, sortActive, currentPage])

    return  <>
                <Store />
                <div className='section filter'>
                    <div className='container'>
                        <Categories items={categories} categoryActive={categoryActive} />
                        <Sorting items={sortingItems} sortActive={sortActive} />
                    </div>
                </div>
                <div className='section products'>
                    <div className='container'>
                        <ProductItems productItems={productItems} isLoaded={isLoaded} error={error} />
                        <Pagination pagesCount={pagesCount} currentPage={currentPage} currentPageChange={currentPageChange} />
                    </div>
                </div>
            </>
}

export default Products

const ProductItems: React.FC<ProductItemsPropsType> = props => {
    if(props.error) return  <>
                                <div className='section__title'>Произошла ошибка</div>
                                <p>К сожалению, не удалось загрузить товары</p>
                            </>
    if(!props.isLoaded) return  <>
                                    {
                                        props.productItems.map(item => <ProductsLoader key={item.id} />)
                                    }
                                </>
    

    return  <div className='products__items product'>
                {
                    props.productItems?.map(item => {
                        return  <Link to={`/products/${item.id}`} key={item.id} className='product__item'>
                                    <div className='product__img'><img src={item.imgUrl} alt={`${item.imgUrl} фото`} /></div>
                                    <div className='product__title'>{item.title}</div>
                                    <div className='product__price'>{item.price} {item.currency}/{item.volume} {item.volumeMeasurement}</div>
                                </Link>
                    }) 
                }
            
            </div>
}

type ProductItemsPropsType = {
    isLoaded: boolean,
    productItems: ProductItem[],
    error: boolean,
}

type ProductItem = {
    id: number,
    imgUrl: string,
    title: string,
    price: number,
    currency: string,
    volume: number,
    volumeMeasurement: string,
}

const ProductsLoader: React.FC = (props) => (
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
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Store from '../../layout/Store/Store'
import { getProducts, productsSelector, setCurrentPage } from '../../../redux/productsSlice'
import Pagination from '../../common/Pagination/Pagination'
import Categories from '../../common/Categories/Categories'
import Sorting from '../../common/Sorting/Sorting'
import { navigationSelector } from '../../../redux/navigationSlice'
import { useAppDispatch } from '../../../redux/store'
import ProductSkeleton from '../../common/Skeleton/ProductSkeleton'


const Products: React.FC = props => {
    const dispatch = useAppDispatch()
    const { productItems, currentPage, pagesCount, status } = useSelector(productsSelector)
    const { navigation, categoryActive, sortActive } = useSelector(navigationSelector)
    const categories = navigation.find(item => item.url === '/products')?.filter
    const sortingItems = navigation.find(item => item.url === '/products')?.sort

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
                        { categories && <Categories items={categories} categoryActive={categoryActive} /> }
                        { sortingItems && <Sorting items={sortingItems} sortActive={sortActive} /> }
                    </div>
                </div>
                <div className='section products'>
                    <div className='container'>
                        <ProductItems productItems={productItems} status={status} />
                        <Pagination pagesCount={pagesCount} currentPage={currentPage} currentPageChange={currentPageChange} />
                    </div>
                </div>
            </>
}

export default Products

const ProductItems: React.FC<ProductItemsPropsType> = props => {
    if(props.status === 'error') return  <>
                                <div className='section__title'>Произошла ошибка</div>
                                <p>К сожалению, не удалось загрузить товары</p>
                            </>
    if(props.status === 'loading') {
        return  <div className='products__items product'>
                    { Array(8).fill('item').map((item, i) => <ProductSkeleton key={i} />)}
                </div>
    }
    

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
    productItems: ProductItem[],
    status: string,
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

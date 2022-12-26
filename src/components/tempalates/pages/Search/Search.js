import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ContentLoader from 'react-content-loader'

import Store from '../../layout/Store/Store'
import imgDefault from '../../../../static/img/products/no.jpg'
//import { setCategoryActive, setSortActive } from '../../../../redux/productsFilterSlice'
//import { getSearchProducts } from '../../../../redux/searchProductsSlice'


const Search = props => {
    //const productsCategoryItems = useSelector(state => state.productsFilter.category)
    //const productsSortItems = useSelector(state => state.productsFilter.sort)
    const productItems = useSelector(state => state.search.productItems)
    const isLoaded = useSelector(state => state.search.isLoaded)
    const query = useSelector(state => state.search.query)

    //const categoryActive = productsCategoryItems?.find(item => item.isActive).type
    //const sortActive = productsSortItems?.find(item => item.isActive).type

    // const searchValue = document.location
    // console.log(searchValue)
    
    //const dispatch = useDispatch()

    // useEffect(() => {
    //     //dispatch(getSearchProducts(categoryActive, sortActive))
    // }, [dispatch, categoryActive, sortActive, searchValue])

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
                            <ProductItems productItems={productItems} isLoaded={isLoaded} />
                        </div>
                    </div>
                </div>
            </>
}

export default Search

const ProductItems = props => {
    
    if(!props.isLoaded) return props.productItems.map(item => <ProductsLoader key={item.id} />)

    return  props.productItems?.map(item => {
                return  <div key={item.id} className='product__item'>
                            <div className='product__img'><img src={item.imgUrl ? item.imgUrl : imgDefault} alt='' /></div>
                            <div className='product__title'><Link to={`/products/${item.id}`}>{item.title}</Link></div>
                            <div className='product__price'>{item.price} {item.currency}/{item.volume} {item.volumeMeasurement}</div>
                        </div>
                    
            }) 
}

// const ProductsCategory = props => {
//     const dispatch = useDispatch()
//     const changeCategory = (e) => dispatch(setCategoryActive(e.currentTarget.innerText))
    
//     return  <div className='filter__category'>
//                 { 
//                     props.productsCategoryItems?.map(item => {
//                         return  <button 
//                                     key={item.id}
//                                     className={ (item.isActive) ? 'btn active' : 'btn'}
//                                     onClick={changeCategory}>{item.title}</button>
//                     }) 
//                 }
//             </div>
// }

// const ProductsSort = props => {
//     const sortRef = useRef()
//     const dispatch = useDispatch()
//     const [sortShow, setSortShow] = useState(false)

//     const sortShowChange = () => {
//         if(sortShow){
//             setSortShow(false)
//             document.body.removeEventListener('click', bodyClick)
//         } else {
//             setSortShow(true)
//             document.body.addEventListener('click', bodyClick)
//         }
//     }

//     const changeSort = (e) => {
//         dispatch(setSortActive(e.currentTarget.innerText))
//         setSortShow(false)
//         document.body.removeEventListener('click', bodyClick)
//     }

//     const bodyClick = (e) => {
//         const path = e.path || (e.composedPath && e.composedPath()) // for firefox browser
//         if(!path.includes(sortRef.current)) {
//             setSortShow(false)
//             document.body.removeEventListener('click', bodyClick)
//         }
//     }

//     return  <div ref={sortRef} className='filter__sort sort'>
//                 Сортировка: <button onClick={sortShowChange}>
//                         { props.productsSortItems?.map(item => item.isActive && item.title) }
//                         {/* { props.productsSortItems?.find(item => item.isActive).title } */}
//                     </button>

//                 <div className={sortShow ? 'sort__items show' : 'sort__items'}>
//                     { 
//                         props.productsSortItems?.map(item => {
//                             return  <button key={item.id} onClick={changeSort}>{item.title}</button>
//                         }) 
//                     }
//                 </div>
//             </div>
// }

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
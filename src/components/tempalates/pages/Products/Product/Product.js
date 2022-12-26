import React, { useEffect, useState } from 'react'

import Store from '../../../layout/Store/Store'
import { getProduct } from '../../../../../redux/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCart } from '../../../../../redux/cartSlice'
import { getCompare } from '../../../../../redux/compareSlice'
import { getFavorites } from '../../../../../redux/favoritesSlice'


const Product = props => {
    const productItem = useSelector(state => state.product.productItem) // получить отвар

    const isLoaded = useSelector(state => state.product.isLoaded)

    const compareItems = useSelector(state => state.compare.compareItems) // получить товары для сранения
    const isCompare = compareItems.find(item => item.id === productItem.id) // проверить есть ли товар в списке для сравнения

    const favoritesItems = useSelector(state => state.favorites.favoritesItems) // получить избранные товары
    const isFavorites = favoritesItems.find(item => item.id === productItem.id) // проверить есть ли товар в избранных


    const [quantity, setQuantity] = useState(1) // для количества товара
    const [cost, setCost] = useState(productItem.price) // стоимость товара

    // увеличить количество товара на 1
    const Increment = () => {
        setQuantity(quantity + 1)
        setCost(productItem.price * (quantity + 1))
    }

    // уменьшить количество товара на 1
    const Decriment = () => {
        if(quantity > 1) {
            setQuantity(quantity - 1)
            setCost(productItem.price * (quantity - 1))
        }
    }

    // проверка введённого значения в количество товара
    const quantityBlur = (e) => {
        let number = +e.target.value
        if(Number.isNaN(number) || number < 1){ // если значение NaN или отрицательное, то
            setQuantity(1)
            setCost(productItem.price)
        }
    }

    // изменить количество товара через input
    const quantityChange = (e) => {
        if(!Number.isNaN(+e.target.value)){ // если значение не NaN, то... 
            setQuantity(+e.target.value)
            setCost(productItem.price * (+e.target.value))
        }
    }

    // добавить товар для сравнения
    const compareClick = () => {
        const comapreItems = JSON.parse(localStorage.getItem('compare')) || [] // запросить localStorage
        const findProduct = comapreItems.find(item => item.id === productItem.id) // проверить наличие товара в сравнении
        if(findProduct){
            comapreItems.splice(comapreItems.indexOf(findProduct), 1)
        } else {
            comapreItems.push(productItem)
        }
        localStorage.setItem('compare', JSON.stringify(comapreItems))
        dispatch(getCompare())
    }

    // добавить отвар в избранное
    const favoritesClick = () => {
        const favoritesItems = JSON.parse(localStorage.getItem('favorites')) || [] // запросить localStorage
        const findProduct = favoritesItems.find(item => item.id === productItem.id) // проверить наличие товара в избранном
        if(findProduct){
            favoritesItems.splice(favoritesItems.indexOf(findProduct), 1)
        } else {
            favoritesItems.push(productItem)
        }
        localStorage.setItem('favorites', JSON.stringify(favoritesItems))
        
        dispatch(getFavorites())
    }

    // добавить товар в корзину
    const addCartClick = () => {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [] // запросить localStorage
        const findProduct = cartItems.find(item => item.id === productItem.id) // проверить наличие товара в корзине
        let  {text, galleryUrl, ...product} = productItem // создание товара
        product = {
            ...product,
            quantity: quantity,
            cost: cost
        }
        if(!findProduct) {
            cartItems.push(product)
        } else {
            findProduct.quantity = quantity
            findProduct.cost = cost
        }
        localStorage.setItem('cart', JSON.stringify(cartItems))
        dispatch(getCart())
    }

    // рейтинг товара
    let ratingStarFill = null // полные звёзды
    let ratingStar = null // пустые звезды
    if(productItem.rating !== null){
        ratingStarFill = Array(productItem.rating).fill().map((item, i) => <i key={i} className="bi bi-star-fill"></i>) || null
        if(productItem.rating < 5)ratingStar = Array(5 - productItem.rating).fill().map((item, i) => <i key={i} className="bi bi-star"></i>) || null 
    }

    // Большая картинка товара
    const [imgActive, setImgActive] = useState(productItem.imgUrl)

    // Вкладки Описание, Характеристики, ОТзывы
    const [tabActive, setTabActive] = useState(1)

    const dispatch = useDispatch()
    const productId = useParams().id // получить id товара из url

    useEffect(() => {
        dispatch(getProduct(productId)) // получить товар
        setImgActive(productItem.imgUrl)
        setCost(productItem.price) // синхронизация цены
    }, [dispatch, productId, productItem.price, productItem.imgUrl])

    if(!isLoaded) return <Store />

    return  <>
                <Store />
                <div className='section product'>
                    <div className='container'>
                        <div className='product__img-container img'>
                            <div className='img__items'>
                                <div className={imgActive === productItem.imgUrl ? 'img__item active' : 'img__item'}>
                                    <img onClick={() => setImgActive(productItem.imgUrl)} src={productItem.imgUrl} alt='Картинка не загрузилась' />
                                </div>
                                {
                                    productItem.galleryUrl?.map(item => <div key={item.toString()} className={imgActive === item ? 'img__item active' : 'img__item'}>
                                        <img onClick={() => setImgActive(item)} src={item} alt='Картинка не загрузилась' />
                                    </div>)
                                }
                            </div>
                            <div className='img__big'>
                                <img src={imgActive} alt='Картинка не загрузилась' />
                            </div>
                        </div>
                        
                        <div className='product__title-container'>
                            <div className='product__info info'>
                                <button onClick={compareClick} className={isCompare && 'active'}><i className="bi bi-bookmark"></i></button>
                                <button onClick={favoritesClick} className={isFavorites && 'active'}><i className="bi bi-heart"></i></button>
                                
                                <div className="info__rating">
                                    { ratingStarFill !== null && ratingStarFill }
                                    { ratingStar !== null && ratingStar }
                                </div>
                            </div>

                            <div className='product__title'>{productItem.title}</div>
                            <div className='product__quantity'>{productItem.volume} {productItem.volumeMeasurement}</div>
                            <div className='product__quantity quantity'>
                                <div className='quantity__title'>Количество</div>
                                <div className='quantity__content'>
                                    <button onClick={Decriment}><i className="bi bi-dash-lg"></i></button> 
                                    <input type="text" onBlur={quantityBlur} onChange={quantityChange} value={quantity} className="quantity__number" min="1" max="7" />
                                    <button onClick={Increment}><i className="bi bi-plus-lg"></i></button>
                                </div>
                                
                            </div>
                            <div className='product__price price'>
                                <div className='price__title'>Стоимость</div>
                                <div className='price__number'>{cost} руб.</div>
                            </div>
                            <button className='btn' onClick={addCartClick}>В корзину</button>
                        </div>
                        
                    </div>

                    <div className='container'>
                        <div className='tab'>
                            <div className='tab__titles items'>
                                <button onClick={() => setTabActive(1)} className={tabActive === 1 ? 'btn tab__title title-1 active' : 'btn tab__title title-1'}>Описание</button>
                                <button onClick={() => setTabActive(2)} className={tabActive === 2 ? 'btn tab__title title-2 active' : 'btn tab__title title-2'}>Характеристики</button>
                                <button onClick={() => setTabActive(3)} className={tabActive === 3 ? 'btn tab__title title-3 active' : 'btn tab__title title-3'}>Отзывы</button>
                            </div>

                            <div className='tab__content content-1'>
                                <div className='product__text'>
                                    { tabActive === 1 && productItem.text?.map(item => <p key={item.toString()}>{item}</p>) }
                                    { tabActive === 2 && <div className='product__property'>
                                        { productItem.property.country && <div>Страна: {productItem.property.country}</div> }
                                        { productItem.property.town && <div>Город: {productItem.property.town}</div> }
                                        { productItem.property.year && <div>Год: {productItem.property.year}</div> }</div> 
                                    }
                                    { tabActive === 3 && 'Отзывов нет' }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
}

export default Product
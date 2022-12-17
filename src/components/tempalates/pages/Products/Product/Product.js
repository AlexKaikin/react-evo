import React, { useState } from 'react'

import Store from '../../../layout/Store/Store'
import imgDefault from '../../../../../static/img/products/1.jpg'


const Product = props => {

    const priceOne = 500

    const   [quantity, setQuantity] = useState(1),
            [price, setPrice] = useState(priceOne)

    const Increment = () => {
        setQuantity(quantity + 1)
        setPrice(priceOne * (quantity + 1))
    }

    const Decriment = () => {
        if(quantity > 1) {
            setQuantity(quantity - 1)
            setPrice(priceOne * (quantity - 1))
        }
    }

    const quantityChange = () => {

    }

    return  <>
                <Store />
                <div className='section product'>
                    <div className='container'>
                        <div className='product__img-container img'>
                            <div className='img__items'>
                                <div className='img__item active'>
                                    <img src={imgDefault} alt='Картинка не загрузилась' />
                                </div>
                                <div className='img__item'>
                                    <img src={imgDefault} alt='Картинка не загрузилась' />
                                </div>
                                <div className='img__item'>
                                    <img src={imgDefault} alt='Картинка не загрузилась' />
                                </div>
                            </div>
                            <div className='img__big'>
                                <img src={imgDefault} alt='Картинка не загрузилась' />
                            </div>
                        </div>
                        
                        <div className='product__title-container'>
                            <div className='product__info info'>
                                <button><i className="bi bi-bookmark"></i></button>
                                <button><i className="bi bi-heart"></i></button>
                                <div className="info__rating">
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star"></i>
                                </div>
                            </div>

                            <div className='product__title'>Шу Пуэр</div>
                            <div className='product__quantity'>100 грамм/1 шт.</div>
                            <div className='product__quantity quantity'>
                                <div className='quantity__title'>Количество</div>
                                <div className='quantity__content'>
                                    <button onClick={Decriment}><i className="bi bi-dash-lg"></i></button> 
                                    <input type="text" onChange={quantityChange} value={quantity} className="quantity__number" min="1" max="7" />
                                    <button onClick={Increment}><i className="bi bi-plus-lg"></i></button>
                                </div>
                                
                            </div>
                            <div className='product__price price'>
                                <div className='price__title'>Стоимость</div>
                                <div className='price__number'>{price} руб.</div>
                            </div>
                            <button className='btn'>В корзину</button>
                        </div>
                        
                    </div>

                    <div className='container'>
                        <div className='product__text'>
                            <p>Особенность Шу — сложная ферментация сырья в процессе приготовления. Вначале чайные листья сушат, затем искусственно ускоряют состаривание, используя технологию пропаривания для создания определенного уровня влажности и стимулирования роста разных микроорганизмов.</p>
                            <p>В процессе постферментации или влажного скирдования микроорганизмы используют для своего роста бензольные основания, что снижает количество полифенолов. Благодаря этому он приобретает мягкий вкус. После сложной ферментации в составе чайных листов увеличивается количество полисахаридов и галловой кислоты, которая снижает производство жирных кислот и биосинтез холестерина в организме.</p>
                        </div>
                    </div>
                </div>
            </>
}

export default Product
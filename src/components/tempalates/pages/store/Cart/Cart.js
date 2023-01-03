import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCart, storeSelector } from '../../../../../redux/storeSlice'
import Store from '../../../layout/Store/Store'


const Cart = props => {
    const { cartItems, totalCost } = useSelector(storeSelector)

    return  <>
                 <Store />
                 <div className='section cart'>
                    <div className='container'>
                        <div className='section__title'>Корзина</div>
                        {
                            cartItems.length > 0
                                ?   <><div className='cart__items'>
                                        <CartItems cartItems={cartItems} />
                                    </div>
                                    <div className='cart__total'>
                                        <div>Всего позицый товаров <span>{ cartItems.length }</span></div>
                                        <div>Сумма заказа <span>{ totalCost }</span> рублей</div>
                                    </div>
                                    <div className='cart__btn'>
                                        <Link to='/products' className='btn btn__prev'><i className="bi bi-chevron-left"></i> Вернуться назад</Link>
                                        <Link to='#' className='btn btn__buy'>Оформить заказ</Link>
                                    </div></>
                                :   <div className='cart__items'>В корзине пусто</div>
                        }
                    </div>
                </div>
                 
            </>
}

export default Cart

const CartItems = props => {
    // проверка введённого значения в количество товара
    const quantityBlur = (e) => {
        // let number = +e.target.value
        // if(Number.isNaN(number) || number < 1){ // если значение NaN или отрицательное, то
        //     setQuantity(1)
        //     setCost(productItem.price)
        // }
    }

    // изменить количество товара через input
    const quantityChange = (e) => {
        // if(!Number.isNaN(+e.target.value)){ // если значение не NaN, то... 
        //     setQuantity(+e.target.value)
        //     setCost(productItem.price * (+e.target.value))
        // }
    }

    const dispatch = useDispatch()

    const Increment = (id) => {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [] // запросить localStorage
        const findProduct = cartItems.find(item => item.id === id) // проверить наличие товара в корзине
        findProduct.quantity += 1
        findProduct.cost += findProduct.price
        localStorage.setItem('cart', JSON.stringify(cartItems))
        dispatch(getCart())
    }

    const Decriment = (id) => {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [] // запросить localStorage
        const findProduct = cartItems.find(item => item.id === id) // проверить наличие товара в корзине
        if(findProduct.quantity > 1){
            findProduct.quantity -= 1
            findProduct.cost -= findProduct.price
        }
        localStorage.setItem('cart', JSON.stringify(cartItems))
        dispatch(getCart())
    }

    const deleteProductClick = (id) => {
        const cartItems = JSON.parse(localStorage.getItem('cart')) // запросить localStorage
        const findProduct = cartItems.find(item => item.id === id) // проверить наличие товара в корзине
        cartItems.splice(cartItems.indexOf(findProduct), 1)
        localStorage.setItem('cart', JSON.stringify(cartItems))
        dispatch(getCart())
    }

    return props.cartItems?.map(item => {
        return  <div key={item.id} className='cart__item product'>
                    <div className='product__img'><img src={item.imgUrl} alt={item.title} /></div>
                    <div className='product__title'><Link to={`/products/${item.id}`}>{item.title}</Link></div>
                    <div className='product__quantity quantity'>
                        <div className='quantity__content'>
                            <button onClick={() => Decriment(item.id)}><i className="bi bi-dash-lg"></i></button> 
                            <input type="text" onBlur={quantityBlur} onChange={quantityChange} value={item.quantity} className="quantity__number" min="1" max="7" />
                            <button onClick={() => Increment(item.id)}><i className="bi bi-plus-lg"></i></button>
                        </div>
                    </div>
                    <div className='product__cost'><span>{item.cost}</span> руб.</div>
                    <div className='product__delete delete'>
                        <button onClick={() => deleteProductClick(item.id)} className='delete__btn'><i className="bi bi-x-lg"></i></button>
                    </div>
                </div>
    })
    
}
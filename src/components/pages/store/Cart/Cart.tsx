import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../../../redux/store'
import { CartItemType, getCart, storeSelector } from '../../../../redux/storeSlice'
import { getLocalStorage } from '../../../../utils/utils'
import Modal from '../../../common/Modal/Modal'
import Store from '../../../layout/Store/Store'


const Cart: React.FC = props => {
    const { cartItems, totalCost } = useSelector(storeSelector)
    const [modalShow, setModalShow] = useState<boolean>(false)
    const modaltoggle = () => {
        setModalShow(!modalShow)
    }

    return  <>
                 <Store />
                 <div className='section cart'>
                    <div className='container'>
                        <div className='section__title'>Корзина</div>
                        {
                            cartItems.length > 0
                                ?   <><CartItems cartItems={cartItems} />
                                    <div className='cart__total'>
                                        <div>Всего позицый товаров <span>{ cartItems.length }</span></div>
                                        <div>Сумма заказа <span>{ totalCost }</span> рублей</div>
                                    </div>
                                    <div className='cart__btn'>
                                        <Link to='/products' className='btn btn__prev'><i className="bi bi-chevron-left"></i> Вернуться назад</Link>
                                        <Link onClick={() => setModalShow(true)} to='#' className='btn btn__buy'>Оформить заказ</Link>
                                    </div></>
                                :   <div className='cart__items'>В корзине пусто</div>
                        }
                    </div>
                </div>
                {
                    modalShow &&    <Modal title='Оформить заказ' modaltoggle={modaltoggle}>
                                        <p>Оформить заказ может только зарегистрированный пользователь</p>
                                        <p>У вас есть аккаунт? <Link to='/login'>Вход</Link></p>
                                        <p>У вас нет аккаунта? <Link to='/register'>Регистрация</Link></p>
                                    </Modal>
                }
            </>
}

export default Cart

const CartItems: React.FC<PropsType> = props => {
    // проверка введённого значения в количество товара
    const quantityBlur = (e: any) => {
        // let number = +e.target.value
        // if(Number.isNaN(number) || number < 1){ // если значение NaN или отрицательное, то
        //     setQuantity(1)
        //     setCost(productItem.price)
        // }
    }

    // изменить количество товара через input
    const quantityChange = (e: any) => {
        // if(!Number.isNaN(+e.target.value)){ // если значение не NaN, то... 
        //     setQuantity(+e.target.value)
        //     setCost(productItem.price * (+e.target.value))
        // }
    }

    const dispatch = useAppDispatch()

    const Increment = (id: number) => {
        const cartItems: CartItemType[] = getLocalStorage('cart') // запросить localStorage
        const findProduct = cartItems.find(item => item.id === id) // проверить наличие товара в корзине
        if(findProduct){
            findProduct.quantity += 1
            findProduct.cost += findProduct.price
        }
        localStorage.setItem('cart', JSON.stringify(cartItems))
        dispatch(getCart())
    }

    const Decriment = (id: number) => {
        const cartItems: CartItemType[] = getLocalStorage('cart') // запросить localStorage
        const findProduct = cartItems.find(item => item.id === id) // проверить наличие товара в корзине
        if(findProduct && findProduct.quantity > 1){
            findProduct.quantity -= 1
            findProduct.cost -= findProduct.price
        }
        localStorage.setItem('cart', JSON.stringify(cartItems))
        dispatch(getCart())
    }

    const deleteProductClick = (id: number) => {
        const cartItems: CartItemType[] = getLocalStorage('cart') // запросить localStorage
        const findProduct = cartItems.find(item => item.id === id) // проверить наличие товара в корзине
        findProduct && cartItems.splice(cartItems.indexOf(findProduct), 1)
        localStorage.setItem('cart', JSON.stringify(cartItems))
        dispatch(getCart())
    }

    return  <div className='cart__items'>
                {
                    props.cartItems?.map(item => {
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
            </div>
    
}

type PropsType = {
    cartItems: CartItemType[] 
}

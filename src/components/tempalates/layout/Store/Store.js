import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { getCart } from '../../../../redux/cartSlice'
import { getCompare } from '../../../../redux/compareSlice'
import { getFavorites } from '../../../../redux/favoritesSlice'


const Store = props => {
    const [showCart, setShowCart] = useState(false)

    const cartItems = useSelector(state => state.cart.cartItems)
    const compareItems = useSelector(state => state.compare.compareItems)
    const favoritesItems = useSelector(state => state.favorites.favoritesItems)

    const showCartChange = () => {
        if(showCart){
            setShowCart(false)
            document.body.removeEventListener('click', bodyClick)
        } else {
            setShowCart(true)
            document.body.addEventListener('click', bodyClick)
        }
    }

    const cartRef = useRef()

    const bodyClick = (e) => {
        const path = e.path || (e.composedPath && e.composedPath()) // for firefox browser
        if(!path.includes(cartRef.current)) {
            setShowCart(false)
            document.body.removeEventListener('click', bodyClick)
        }
    }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCompare())
        dispatch(getFavorites())
        dispatch(getCart())
    }, [dispatch])


    return  <section className='store'>
                <div className="container">
                    <div className="store__search">
                        <form action="#" className="form">
                            <input type="text" placeholder="Найти товар..." required />
                            <button className=""><i className="bi bi-search"></i></button>
                        </form>
                    </div>

                    <div className='store__info items'>
                        <NavLink to='/compare' className='item bookmark'>
                            { compareItems.length > 0 ? <div className='count'>{compareItems.length}</div> : null }
                            <i className="bi bi-bookmarks"></i>
                        </NavLink>
                        <NavLink to='/favorites' className='item'>
                            { favoritesItems.length > 0 ? <div className='count'>{favoritesItems.length}</div> : null }
                            <i className="bi bi-heart"></i>
                        </NavLink>
                        <div ref={cartRef} className='item cart-block'>
                            { cartItems.length > 0 ? <div className='count'>{cartItems.length}</div> : null }
                            <button onClick={showCartChange} className="cart">
                                <i className="bi bi-bag"></i>
                            </button>
                            <div className={showCart ? 'cart__items show' : 'cart__items'}>
                                { cartItems.length > 0 ? <CartItems cartItems={cartItems} /> : <div>В корзине пусто</div> }
                                <Link to='/cart' className='cart-link'>Перейти в корзину</Link>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>
}

export default Store

const CartItems = props => {
    const dispatch = useDispatch()

    const deleteProductClick = (id) => {
        const cartItems = JSON.parse(localStorage.getItem('cart')) // запросить localStorage
        const findProduct = cartItems.find(item => item.id === id) // проверить наличие товара в корзине
        cartItems.splice(cartItems.indexOf(findProduct), 1)
        localStorage.setItem('cart', JSON.stringify(cartItems))
        dispatch(getCart())
    }

    return props.cartItems?.map(item => <div key={item.id} className='cart__item'>
                                            <div><Link to={`/products/${item.id}`}>{item.title}</Link></div>
                                            <div><button onClick={() => deleteProductClick(item.id)} className='delete__btn'><i className="bi bi-x-lg"></i></button></div>
                                        </div>)
}
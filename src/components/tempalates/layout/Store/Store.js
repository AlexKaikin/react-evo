import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { getCart, getStore } from '../../../../redux/storeSlice'


const Store = props => {
    const [showCart, setShowCart] = useState(false)

    const { cartItems, compareItems, favoritesItems } = useSelector(state => state.store)

    const showCartClick = () => {
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

    // форма поиска
    const [searchValue, setSearchValue] = useState('')
    const SearchValueChange = (e) => {
        setSearchValue(e.target.value)
    }

    const navigate = useNavigate() // редирект на страницу поиска
    const searchRef = useRef()
    const searchClick = (e, searchValue) => {
        e.preventDefault()
        if(searchValue !== '') {
            //dispatch(getSearchProducts(searchValue, 1, 8))
            navigate(`/search/?q=${searchValue}`)
        } else {
            const error = '<p class="error">Пожалуйста, введите запрос</p>'
            searchRef.current.insertAdjacentHTML('beforeend', error)
            setTimeout(() => {
                document.querySelector(".error").outerHTML = "";
              }, 2000)
        }
    }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getStore())
    }, [dispatch])


    return  <section className='store'>
                <div className="container">
                    <div className="store__search">
                        <form ref={searchRef} action="#" className="form">
                            <input onChange={SearchValueChange} value={searchValue} type="text" placeholder="Найти товар..." required />
                            <button onClick={(e) => searchClick(e, searchValue)} type="submit" className=""><i className="bi bi-search"></i></button>
                        </form>
                        {/* <button className='mobile__search'><i className="bi bi-search"></i></button> */}
                    </div>

                    <div className='store__info items'>
                        <NavLink to='/compare' className='item bookmark'>
                            { compareItems.length > 0 && <div className='count'>{compareItems.length}</div> }
                            <i className="bi bi-bookmarks"></i>
                        </NavLink>
                        <NavLink to='/favorites' className='item'>
                            { favoritesItems.length > 0 && <div className='count'>{favoritesItems.length}</div> }
                            <i className="bi bi-heart"></i>
                        </NavLink>
                        <div ref={cartRef} className='item cart-block'>
                            { cartItems.length > 0 && <div className='count'>{cartItems.length}</div> }
                            <button onClick={showCartClick} className="cart">
                                <i className="bi bi-bag"></i>
                            </button>
                            <div className={showCart ? 'cart__items show' : 'cart__items'}>
                                { cartItems.length > 0 ? <CartItems cartItems={cartItems} showCartClick={showCartClick} /> : <div>В корзине пусто</div> }
                                <Link onClick={showCartClick} to='/cart' className='cart-link'>Перейти в корзину</Link>
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
                                            <div><Link to={`/products/${item.id}`} onClick={props.showCartClick}>{item.title}</Link></div>
                                            <div><button onClick={() => deleteProductClick(item.id)} className='delete__btn'><i className="bi bi-x-lg"></i></button></div>
                                        </div>)
}
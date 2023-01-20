import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../store/store'
import { getStore, storeSelector } from '../../../store/storeSlice'
import CartItems from './CartItems/CartItems'
import './Store.scss'

const Store: React.FC = (props) => {
    const [showCart, setShowCart] = useState<boolean>(false)

    const { cartItems, compareItems, favoritesItems } =
        useSelector(storeSelector)

    const cartRef = useRef<HTMLDivElement>(null)

    const bodyClick = React.useCallback((e: MouseEvent) => {
        const _e = e as BodyClickType
        const path = _e.path || (e.composedPath && e.composedPath()) // for firefox browser
        if (cartRef.current && !path.includes(cartRef.current)) {
            setShowCart(false)
            document.body.removeEventListener('click', bodyClick)
        }
    }, [])

    const showCartClick = React.useCallback(() => {
        if (showCart) {
            setShowCart(false)
            document.body.removeEventListener('click', bodyClick)
        } else {
            setShowCart(true)
            document.body.addEventListener('click', bodyClick)
        }
    }, [showCart, bodyClick])

    // форма поиска
    const [searchValue, setSearchValue] = useState<string>('')
    const SearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    const navigate = useNavigate() // редирект на страницу поиска
    const searchRef = useRef<HTMLFormElement>(null)
    const searchClick = (
        e: React.MouseEvent<HTMLButtonElement>,
        searchValue: string
    ) => {
        e.preventDefault()
        if (searchValue !== '') {
            setSearchValue('')
            navigate(`/search/?q=${searchValue}`)
        } else {
            const error = '<p class="error">Пожалуйста, введите запрос</p>'
            searchRef.current?.insertAdjacentHTML('beforeend', error)
            setTimeout(() => {
                if (searchRef.current?.querySelector('.error')) {
                    let msgShow = searchRef.current.querySelector('.error')
                    if (msgShow !== null) msgShow.outerHTML = ''
                }
            }, 2000)
        }
    }

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getStore())
    }, [dispatch])

    return (
        <section className="store">
            <div className="container">
                <div className="store__search">
                    <form ref={searchRef} action="#" className="form">
                        <input
                            onChange={SearchValueChange}
                            value={searchValue}
                            type="text"
                            placeholder="Найти товар..."
                            required
                        />
                        <button
                            onClick={(e) => searchClick(e, searchValue)}
                            type="submit"
                            className=""
                        >
                            <i className="bi bi-search"></i>
                        </button>
                    </form>
                </div>

                <div className="store__info items">
                    <NavLink to="/compare" className="item bookmark">
                        {compareItems.length > 0 && (
                            <div className="count">{compareItems.length}</div>
                        )}
                        <i className="bi bi-bookmarks"></i>
                    </NavLink>
                    <NavLink to="/favorites" className="item">
                        {favoritesItems.length > 0 && (
                            <div className="count">{favoritesItems.length}</div>
                        )}
                        <i className="bi bi-heart"></i>
                    </NavLink>
                    <div ref={cartRef} className="item cart-block">
                        {cartItems.length > 0 && (
                            <div className="count">{cartItems.length}</div>
                        )}
                        <button onClick={showCartClick} className="cart">
                            <i className="bi bi-bag"></i>
                        </button>
                        <div
                            className={
                                showCart ? 'cart__items show' : 'cart__items'
                            }
                        >
                            {cartItems.length > 0 ? (
                                <CartItems
                                    cartItems={cartItems}
                                    showCartClick={showCartClick}
                                />
                            ) : (
                                <div>В корзине пусто</div>
                            )}
                            <Link
                                onClick={showCartClick}
                                to="/cart"
                                className="cart-link"
                            >
                                Перейти в корзину
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Store

type BodyClickType = MouseEvent & { path: Node[] } // добавить path в event

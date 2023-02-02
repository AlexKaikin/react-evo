import React, { useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import cn from 'classnames'
import CartItems from './CartItems/CartItems'
import {
  CartItemType,
  CompareItemType,
  FavoriteItemType,
} from '../../../../../store/products/storeSlice'

const Focus: React.FC<PropsType> = ({
  cartItems,
  compareItems,
  favoritesItems,
}) => {
  const [showCart, setShowCart] = useState<boolean>(false)
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

  return (
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
        <div className={cn('cart__items', { show: showCart })}>
          {cartItems.length > 0 ? (
            <CartItems cartItems={cartItems} showCartClick={showCartClick} />
          ) : (
            <div>В корзине пусто</div>
          )}
          <Link onClick={showCartClick} to="/cart" className="cart-link">
            Перейти в корзину
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Focus

type BodyClickType = MouseEvent & { path: Node[] } // добавить path в event

type PropsType = {
  cartItems: CartItemType[]
  compareItems: CompareItemType[]
  favoritesItems: FavoriteItemType[]
}

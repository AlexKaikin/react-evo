import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../../../../../store/store'
import {
  CartItemType,
  getCart,
} from '../../../../../../store/products/storeSlice'
import { getLocalStorage } from '../../../../../../utils/utils'

const CartItems: React.FC<PropsType> = (props) => {
  const dispatch = useAppDispatch()

  const deleteProductClick = (id: number) => {
    const cartItems: CartItemType[] = getLocalStorage('cart') // запросить localStorage
    const findProduct = cartItems.find((item) => item.id === id) // проверить наличие товара в корзине
    findProduct && cartItems.splice(cartItems.indexOf(findProduct), 1)
    localStorage.setItem('cart', JSON.stringify(cartItems))
    dispatch(getCart())
  }

  return (
    <>
      {props.cartItems?.map((item) => (
        <div key={item.id} className="cart__item">
          <div>
            <Link to={`/products/${item.id}`} onClick={props.showCartClick}>
              {item.title}
            </Link>
          </div>
          <div>
            <button
              onClick={() => deleteProductClick(item.id)}
              className="delete__btn"
            >
              <i className="bi bi-trash3"></i>
            </button>
          </div>
        </div>
      ))}
    </>
  )
}

export default React.memo(CartItems)

type PropsType = {
  cartItems: CartItemType[]
  showCartClick: () => void
}

import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../../../../store/store'
import { CartItemType, getCart } from '../../../../../store/products/storeSlice'
import { getLocalStorage } from '../../../../../utils/utils'

const CartItems: React.FC<PropsType> = (props) => {
  // проверка введённого значения в количество товара
  const quantityBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // let number = +e.target.value
    // if(Number.isNaN(number) || number < 1){ // если значение NaN или отрицательное, то
    //     setQuantity(1)
    //     setCost(productItem.price)
    // }
  }

  // изменить количество товара через input
  const quantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if(!Number.isNaN(+e.target.value)){ // если значение не NaN, то...
    //     setQuantity(+e.target.value)
    //     setCost(productItem.price * (+e.target.value))
    // }
  }

  const dispatch = useAppDispatch()

  const Increment = (id: number) => {
    const cartItems: CartItemType[] = getLocalStorage('cart') // запросить localStorage
    const findProduct = cartItems.find((item) => item.id === id) // проверить наличие товара в корзине
    if (findProduct) {
      findProduct.quantity += 1
      findProduct.cost += findProduct.price
    }
    localStorage.setItem('cart', JSON.stringify(cartItems))
    dispatch(getCart())
  }

  const Decriment = (id: number) => {
    const cartItems: CartItemType[] = getLocalStorage('cart') // запросить localStorage
    const findProduct = cartItems.find((item) => item.id === id) // проверить наличие товара в корзине
    if (findProduct && findProduct.quantity > 1) {
      findProduct.quantity -= 1
      findProduct.cost -= findProduct.price
    }
    localStorage.setItem('cart', JSON.stringify(cartItems))
    dispatch(getCart())
  }

  const deleteProductClick = (id: number) => {
    const cartItems: CartItemType[] = getLocalStorage('cart') // запросить localStorage
    const findProduct = cartItems.find((item) => item.id === id) // проверить наличие товара в корзине
    findProduct && cartItems.splice(cartItems.indexOf(findProduct), 1)
    localStorage.setItem('cart', JSON.stringify(cartItems))
    dispatch(getCart())
  }

  return (
    <div className="cart__items">
      {props.cartItems?.map((item) => {
        return (
          <div key={item.id} className="cart__item product">
            <div className="product__img">
              <img
                src={(process.env.REACT_APP_SERVER_URL || '') + item.imgUrl}
                alt={item.title}
              />
            </div>
            <div className="product__title">
              <Link to={`/products/${item.id}`}>{item.title}</Link>
            </div>
            <div className="product__quantity quantity">
              <div className="quantity__content">
                <button onClick={() => Decriment(item.id)}>
                  <i className="bi bi-dash-lg"></i>
                </button>
                <input
                  type="text"
                  onBlur={quantityBlur}
                  onChange={quantityChange}
                  value={item.quantity}
                  className="quantity__number"
                  min="1"
                  max="7"
                />
                <button onClick={() => Increment(item.id)}>
                  <i className="bi bi-plus-lg"></i>
                </button>
              </div>
            </div>
            <div className="product__cost">
              <span>{item.cost}</span> руб.
            </div>
            <div className="product__delete delete">
              <button
                onClick={() => deleteProductClick(item.id)}
                className="delete__btn"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CartItems

type PropsType = {
  cartItems: CartItemType[]
}

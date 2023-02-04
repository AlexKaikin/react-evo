import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { authSelector } from '../../../../store/account/authSlice'
import { storeSelector } from '../../../../store/products/storeSlice'
import Modal from '../../../common/Modal/Modal'
import Cloud from '../../../layout/Cloud/Product/Cloud'
import './Cart.scss'
import CartItems from './CartItems/CartItems'
import OrderForm from './OrderForm/OrderForm'

const Cart: React.FC = (props) => {
  const auth = useSelector(authSelector)
  const { cartItems, totalCost } = useSelector(storeSelector)
  const [modalShow, setModalShow] = useState<boolean>(false)
  const [orderFormShow, setOrderFormModalShow] = useState<boolean>(false)
  const modaltoggle = () => setModalShow(!modalShow)

  const orderFormClick = () => {
    if (auth.data) {
      setOrderFormModalShow(true)
      setTimeout(() => {
        orderFormRef.current && orderFormRef.current.scrollIntoView({
            block: 'start',
            behavior: 'smooth',
          })
      }, 100)
    } else {
      setModalShow(true)
    }
  }

  const orderFormRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <Cloud />
      <div className="section cart">
        <div className="container">
          <div className="section__title">Корзина</div>
          {cartItems.length > 0 ? (
            <>
              <CartItems cartItems={cartItems} />
              <div className="cart__total">
                <div>
                  Всего позицый товаров <span>{cartItems.length}</span>
                </div>
                <div>
                  Сумма заказа <span>{totalCost}</span> рублей
                </div>
              </div>
              <div className="cart__btn">
                <Link to="/products" className="btn btn-light">
                  <i className="bi bi-chevron-left"></i> Вернуться назад
                </Link>
                <Link onClick={orderFormClick} to="#" className="btn btn__buy">
                  Оформить заказ
                </Link>
              </div>
            </>
          ) : (
            <div className="cart__items">В корзине пусто</div>
          )}
        </div>
      </div>
      {orderFormShow && <OrderForm orderFormRef={orderFormRef} />}
      {modalShow && (
        <Modal title="Оформить заказ" modaltoggle={modaltoggle}>
          <p>Оформить заказ может только зарегистрированный пользователь</p>
          <p>
            У вас есть аккаунт? <Link to="/login">Вход</Link>
          </p>
          <p>
            У вас нет аккаунта? <Link to="/register">Регистрация</Link>
          </p>
        </Modal>
      )}
    </>
  )
}

export default Cart

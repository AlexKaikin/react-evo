import React from 'react'
import { OrderItemType } from '../../../../../store/products/orderSlice'
import Modal from '../../../../common/Modal/Modal'

const OrderFull: React.FC<PropsType> = ({orderShow, modaltoggle}) => {
  return <Modal title={`Заказ №${orderShow.id}`} modaltoggle={modaltoggle} full>
  <div className="container">
    <div className="order__items">
      {orderShow.cartItems.map((item) => (
        <div key={item.id} className="order__item product">
          <div className="product__img">
            <img
              src={
                (process.env.REACT_APP_SERVER_URL || '') + item.imgUrl
              }
              alt={item.title}
            />
          </div>
          <div className="product__title">{item.title}</div>
          <div className="product__quantity">{item.quantity} шт.</div>
          <div className="product__cost">
            <span>{item.cost}</span> руб.
          </div>
        </div>
      ))}
    </div>
    <div className="order__total">
      <div>
        Всего позицый товаров <span>{orderShow.cartItems.length}</span>
      </div>
      <div>
        Сумма заказа <span>{orderShow.totalCost}</span> рублей
      </div>
    </div>
    <div className="contacts">
      <div className="contacts__column">
        <div className="order__title">Получатель</div>
        <div className="form__field">
          <label>Фамилия</label>
          <p>{orderShow.surname}</p>
        </div>
        <div className="form__field">
          <label>Имя</label>
          <p>{orderShow.name}</p>
        </div>
        <div className="form__field">
          <label>Отчество</label>
          <p>{orderShow.middleName}</p>
        </div>
      </div>
      <div className="contacts__column">
        <div className="order__title">Адрес</div>
        <div className="form__field">
          <label>Область/край</label>
          <p>{orderShow.region}</p>
        </div>
        <div className="form__field">
          <label>Город</label>
          <p>{orderShow.city}</p>
        </div>
        <div className="form__field">
          <label>Улица</label>
          <p>{orderShow.street}</p>
        </div>
        <div className="form__field">
          <label>Дом и квартира</label>
          <p>{orderShow.home}</p>
        </div>
        <div className="form__field">
          <label>Индекс</label>
          <p>{orderShow.index}</p>
        </div>
      </div>
    </div>
  </div>
</Modal>
}

export default OrderFull

type PropsType = {
  orderShow: OrderItemType,
  modaltoggle: () => void,
}
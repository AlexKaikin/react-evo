import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { updateOrder } from '../../../../../store/admin/products/ordersAdminSlice'
import { OrderItemType } from '../../../../../store/products/orderSlice'
import { useAppDispatch } from '../../../../../store/store'
import Modal from '../../../../common/Modal/Modal'

const OrderFull: React.FC<PropsType> = ({ orderShow, modaltoggle }) => {
  const dispatch = useAppDispatch()
  const [modalShow, setModalShow] = useState<boolean>(false)
  const modaltoggle2 = () => setModalShow(!modalShow)

  const formState: OrderItemType = {
    _id: orderShow._id,
    id: orderShow.id,
    name: orderShow.name,
    surname: orderShow.surname,
    middleName: orderShow.middleName,
    region: orderShow.region,
    city: orderShow.city,
    street: orderShow.street,
    home: orderShow.home,
    index: orderShow.index,
    cartItems: orderShow.cartItems,
    totalCost: orderShow.totalCost,
    status: orderShow.status,
    created: orderShow.created,
  }

  const formSubmit = async (values: OrderItemType) => {
    const res = await dispatch(updateOrder(values))
    if(res === 'ok') setModalShow(true)
  }

  return (
    <Modal title={`Заказ №${orderShow.id}`} modaltoggle={modaltoggle} full>
      <div className="container">
        <div className="order__items">
          {orderShow.cartItems.map((item) => (
            <div key={item.id} className="order__item product">
              <div className="product__img">
                <img
                  src={(process.env.REACT_APP_SERVER_URL || '') + item.imgUrl}
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
        <Formik
          initialValues={formState}
          validate={formValidate}
          onSubmit={formSubmit}
        >
          <Form>
            <div className="order__status">
              Статус:
              <Field as="select" type="text" name="status">
                <option>Ожидает оплаты</option>  
                <option>Отменён</option>  
                <option>В пути</option>  
                <option>Доставлен</option>  
              </Field>
              <button type="submit" className="btn">
                Обновить статус
              </button>
            </div>
          </Form>
        </Formik>

        {modalShow && (
        <Modal title="Обновление заказа" modaltoggle={modaltoggle2}>
          <p>Статус обновлён</p>
        </Modal>
      )}
      </div>
    </Modal>
  )
}

export default OrderFull

type PropsType = {
  orderShow: OrderItemType
  modaltoggle: () => void
}

const formValidate = (values: OrderItemType) => {
  const errors = {}
  return errors
}

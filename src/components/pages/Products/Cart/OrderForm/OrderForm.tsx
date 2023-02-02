import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { OrderItemType } from '../../../../../store/products/orderSlice'
import { createOrder } from '../../../../../store/products/storeSlice'
import { useAppDispatch } from '../../../../../store/store'

const OrderForm: React.FC<PropsType> = ({ orderFormRef }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const formState: OrderItemType = {
    id: 0,
    name: '',
    surname: '',
    middleName: '',
    region: '',
    city: '',
    street: '',
    home: '',
    index: 0,
    cartItems: [],
    totalCost: 0,
    status: '',
    created: '',
  }

  const formSubmit = (values: OrderItemType) => {
    dispatch(createOrder(values))
    navigate('/orders')
  }

  return (
    <div ref={orderFormRef} id="order-form" className="section order-form">
      <div className="container">
        <div className="section__title">Данные получателя</div>
        <Formik
          initialValues={formState}
          validate={formValidate}
          onSubmit={formSubmit}
        >
          <Form className="form">
            <div className="form__field">
              <label>Фамилия</label>
              <Field type="text" name="surname" />
            </div>

            <div className="form__field">
              <label>Имя</label>
              <Field type="text" name="name" />
            </div>

            <div className="form__field">
              <label>Отчество</label>
              <Field type="text" name="middleName" />
            </div>

            <div className="section__title">Адрес доставки</div>

            <div className="form__field">
              <label>Область/край</label>
              <Field type="text" name="region" />
            </div>

            <div className="form__field">
              <label>Населённый пункт</label>
              <Field type="text" name="city" />
            </div>

            <div className="form__field">
              <label>Улица</label>
              <Field type="text" name="street" />
            </div>

            <div className="form__field">
              <label>Дом и квартира</label>
              <Field type="text" name="home" />
            </div>

            <div className="form__field">
              <label>Индекс</label>
              <Field type="text" name="index" />
            </div>

            <button type="submit" className="form__btn">
              Отправить
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default OrderForm

const formValidate = (values: OrderItemType) => {
  const errors = {}
  return errors
}

type PropsType = {
  orderFormRef: any
}

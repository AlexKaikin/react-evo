import React, { useState } from 'react'
import { deleteOrder } from '../../../../../store/admin/products/ordersAdminSlice'
import { OrderItemType } from '../../../../../store/products/orderSlice'
import { useAppDispatch } from '../../../../../store/store'
import Modal from '../../../../common/Modal/Modal'
import OrderFull from '../OrderFull/OrderFull'

const OrderItems: React.FC<PropsType> = ({ orderItems, updateComponent }) => {
  const dispatch = useAppDispatch()
  const [orderShow, setOrderShow] = useState<OrderItemType | null>(null)
  const [deleteShow, setdeleteShow] = useState<number | null>(null)
  const modaltoggle = () => setOrderShow(null)
  const modaltoggle2 = () => setdeleteShow(null)
  if (!orderItems.length) return <div>Заказов нет</div>

  return (
    <div>
      <div className="order__items">
        <div className="order__item order">
          <div>№ заказа</div>
          <div>Создан</div>
          <div>Статус</div>
          <div></div>
          <div></div>
        </div>
        {orderItems.map((item) => (
          <div key={item.id} className="order__item order">
            <div>Заказ №{item.id}</div>
            <div>{item.created}</div>
            <div>{item.status}</div>
            <button
              onClick={() => setOrderShow(item)}
              className="btn btn-light p10"
            >
              <i className="bi bi-pencil-square"></i>
            </button>
            <button
              onClick={() => setdeleteShow(item.id)}
              className="btn btn-light p10"
            >
              <i className="bi bi-trash3"></i>
            </button>
          </div>
        ))}
      </div>

      {orderShow && (
        <OrderFull orderShow={orderShow} modaltoggle={modaltoggle} />
      )}

      {deleteShow && (
        <Modal title="Удалить заказ" modaltoggle={modaltoggle2}>
          <p>Вы действительно хотите удалить заказ?</p>
          <div className="button-wrapper">
            <button
              className="btn btn-warning"
              onClick={() => {
                dispatch(deleteOrder(deleteShow))
                setdeleteShow(null)
                updateComponent()
              }}
            >
              Удалить
            </button>
            <button className="btn btn-light" onClick={modaltoggle2}>
              Отмена
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default OrderItems

type PropsType = {
  orderItems: OrderItemType[]
  updateComponent: () => void
}

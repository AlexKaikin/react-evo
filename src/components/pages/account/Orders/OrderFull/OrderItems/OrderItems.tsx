import React, { useState } from 'react'
import { OrderItemType } from '../../../../../../store/products/orderSlice'
import OrderFull from '../OrderFull'


const OrderItems: React.FC<PropsType> = ({ orderItems }) => {
  const [orderShow, setOrderShow] = useState<OrderItemType | null>(null)
  const modaltoggle = () => setOrderShow(null)
  if (!orderItems.length) return <div>Заказов нет</div>

  return (
    <div>
      <div className="order__items">
        <div className="order__item order">
          <div>№ заказа</div>
          <div>Создан</div>
          <div>Статус</div>
        </div>
        {orderItems.map((item) => (
          <div key={item.id} className="order__item order">
            <div>
              <button onClick={() => setOrderShow(item)}>
                Заказ №{item.id}
              </button>
            </div>
            <div>{item.created}</div>
            <div>{item.status}</div>
          </div>
        ))}
      </div>

      {orderShow && (
        <OrderFull orderShow={orderShow} modaltoggle={modaltoggle} />
      )}
    </div>
  )
}

export default OrderItems

type PropsType = {
  orderItems: OrderItemType[]
}

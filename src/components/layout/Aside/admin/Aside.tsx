import React from 'react'
import { NavLink } from 'react-router-dom'
import './Aside.scss'

const Aside: React.FC = (props) => {
  return (
    <aside className="aside">
      <div className="nav">
        <NavLink to="/admin/dashboard" className="item" end>
          <i className="bi bi-speedometer2"></i> Дашборд
        </NavLink>
        <div className='dash'></div>
        <NavLink to="/admin/products" className="item" end>
          <i className="bi bi-postcard"></i> Товары
        </NavLink>
        <NavLink to="/admin/reviews" className="item" end>
          <i className="bi bi-star-half"></i> Отзывы
        </NavLink>
        <NavLink to="/admin/orders" className="item" end>
          <i className="bi bi-bag"></i> Заказы
        </NavLink>
        <div className='dash'></div>
        <NavLink to="/admin/messages" className="item" end>
          <i className="bi bi-chat-text"></i> Сообщения
        </NavLink>
      </div>
    </aside>
  )
}

export default Aside

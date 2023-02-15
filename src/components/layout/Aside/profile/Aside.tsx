import React from 'react'
import { NavLink } from 'react-router-dom'
import './Aside.scss'

const Aside: React.FC = (props) => {
  return (
    <aside className="aside">
      <div className="nav">
        <NavLink to="/profile" className="item" end>
          <i className="bi bi-person"></i> Профиль
        </NavLink>
        <NavLink to="/profile/orders" className="item" end>
          <i className="bi bi-bag"></i> Заказы
        </NavLink>
        <NavLink to="/profile/reviews" className="item" end>
          <i className="bi bi-star-half"></i> Отзывы
        </NavLink>
      </div>
    </aside>
  )
}

export default Aside

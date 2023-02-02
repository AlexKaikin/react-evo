import React from 'react'
import { NavLink } from 'react-router-dom'
import './Aside.scss'

const Aside: React.FC = (props) => {
  return (
    <aside className="aside">
      <div className="nav">
        <NavLink to="/profile" className="item">
          <i className="bi bi-person"></i> Профиль
        </NavLink>
        <NavLink to="/orders" className="item">
          <i className="bi bi-bag"></i> Заказы
        </NavLink>
      </div>
    </aside>
  )
}

export default Aside

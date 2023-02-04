import React from 'react'
import './NavSkeleton.scss'

const NavSkeleton: React.FC = (props) => {
  return (
    <nav className="header__nav nav skeleton">
      <ul className='nav__items'>
        <li className="nav__item"></li>
        <li className="nav__item"></li>
        <li className="nav__item"></li>
        <li className="nav__item"></li>
      </ul>
      <button className="mobile__menu"></button>
    </nav>
  )
}

export default NavSkeleton

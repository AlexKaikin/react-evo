import React, { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import cn from 'classnames'
import { NavigationItemType } from '../../../../store/navigation/navigationSlice'

const Nav: React.FC<PropsType> = (props) => {
  const menuRef = useRef<HTMLElement>(null)
  const [menuShow, setMenuShow] = useState<boolean>(false)

  const bodyClick = React.useCallback((e: MouseEvent) => {
    const _e = e as BodyClickType
    const path = _e.path || (e.composedPath && e.composedPath()) // for firefox browser
    if (menuRef.current && !path.includes(menuRef.current)) {
      setMenuShow(false)
      document.body.removeEventListener('click', bodyClick)
    }
  }, [])

  const menuShowChange = React.useCallback(() => {
    if (menuShow) {
      setMenuShow(false)
      document.body.removeEventListener('click', bodyClick)
    } else {
      setMenuShow(true)
      document.body.addEventListener('click', bodyClick)
    }
  }, [menuShow, bodyClick])

  if(!props.items.length) return <nav className="header__nav nav"></nav>

  return (
    <nav ref={menuRef} className="header__nav nav">
      <ul className={cn('nav__items', { show: menuShow })}>
        {props.items.map((item) => (
          <li key={item.id} className="nav__item">
            <NavLink
              to={item.url}
              onClick={menuShowChange}
              className="nav__link"
            >
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
      <button onClick={menuShowChange} className="mobile__menu">
        <i className="bi bi-list"></i> Меню
      </button>
    </nav>
  )
}

export default React.memo(Nav)

type PropsType = {
  items: NavigationItemType[]
}

type BodyClickType = MouseEvent & { path: Node[] } // добавить path в event

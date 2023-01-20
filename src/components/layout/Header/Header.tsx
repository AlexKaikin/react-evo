import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import cn from 'classnames'

import { navigationSelector } from '../../../store/navigationSlice'
import Nav from './Nav/Nav'
import './Header.scss'

const Header: React.FC = (props) => {
    const [authShow, setAuthShow] = useState<boolean>(false)
    const { navigation } = useSelector(navigationSelector)

    const AuthShowChange = () => {
        if (authShow) {
            setAuthShow(false)
            document.body.removeEventListener('click', bodyClick)
        } else {
            setAuthShow(true)
            document.body.addEventListener('click', bodyClick)
        }
    }

    const authRef = useRef<HTMLDivElement>(null)

    const bodyClick = (e: MouseEvent) => {
        const _e = e as BodyClickType
        const path = _e.path || (e.composedPath && e.composedPath()) // for firefox browser
        if (authRef.current && !path.includes(authRef.current)) {
            setAuthShow(false)
            document.body.removeEventListener('click', bodyClick)
        }
    }

    const menuRef = useRef<HTMLElement>(null)
    const bodyClick2 = React.useCallback((e: MouseEvent) => {
        const _e = e as BodyClickType
        const path = _e.path || (e.composedPath && e.composedPath()) // for firefox browser
        if (menuRef.current && !path.includes(menuRef.current)) {
            setMenuShow(false)
            document.body.removeEventListener('click', bodyClick2)
        }
    }, [])

    const [menuShow, setMenuShow] = useState<boolean>(false)
    const menuShowChange = React.useCallback(() => {
        if (menuShow) {
            setMenuShow(false)
            document.body.removeEventListener('click', bodyClick2)
        } else {
            setMenuShow(true)
            document.body.addEventListener('click', bodyClick2)
        }
    }, [menuShow, bodyClick2])

    return (
        <header className="header">
            <div className="container">
                <div className="header__logo">EVO</div>
                <nav ref={menuRef} className="header__nav nav">
                    <ul className={cn('nav__items', { show: menuShow })}>
                        <Nav
                            items={navigation}
                            menuShowChange={menuShowChange}
                        />
                    </ul>
                    <button onClick={menuShowChange} className="mobile__menu">
                        <i className="bi bi-list"></i> Меню
                    </button>
                </nav>

                <div ref={authRef} className="auth">
                    <button onClick={AuthShowChange}>
                        <i className="bi bi-person-circle"></i>{' '}
                        <span>Личный кабинет</span>
                    </button>
                    <ul className={cn('auth__items', { show: authShow })}>
                        <li className="auth__item">
                            <NavLink
                                to="/login"
                                onClick={AuthShowChange}
                                className="auth__link"
                            >
                                Вход
                            </NavLink>
                        </li>
                        <li className="auth__item">
                            <NavLink
                                to="/register"
                                onClick={AuthShowChange}
                                className="auth__link"
                            >
                                Регистрация
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default React.memo(Header)

type BodyClickType = MouseEvent & { path: Node[] } // добавить path в event

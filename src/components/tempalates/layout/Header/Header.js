import React, { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'


const Header = props => {
    const [authShow, setAuthShow] = useState(false)
    
    const AuthShowChange = () => {
        if(authShow){
            setAuthShow(false)
            document.body.removeEventListener('click', bodyClick)
        } else {
            setAuthShow(true)
            document.body.addEventListener('click', bodyClick)
        }
    }

    const authRef = useRef()

    const bodyClick = (e) => {
        const path = e.path || (e.composedPath && e.composedPath()) // for firefox browser
        if(!path.includes(authRef.current)) {
            setAuthShow(false)
            document.body.removeEventListener('click', bodyClick)
        }
    }

    const [menuShow, setMenuShow] = useState(false)
    const menuShowChange = () => {
        if(menuShow){
            setMenuShow(false)
            document.body.removeEventListener('click', bodyClick2)
        } else {
            setMenuShow(true)
            document.body.addEventListener('click', bodyClick2)
        }
    }
    const menuRef = useRef()
    const bodyClick2 = (e) => {
        const path = e.path || (e.composedPath && e.composedPath()) // for firefox browser
        if(!path.includes(menuRef.current)) {
            setMenuShow(false)
            document.body.removeEventListener('click', bodyClick2)
        }
    }

    return  <header className='header'>
                <div className='container'>
                    <div className='header__logo'>EVO</div>
                    <nav ref={menuRef} className='header__nav nav'>
                        <ul className={menuShow ? 'nav__items show' : 'nav__items'}>
                            <li className='nav__item'><NavLink to="/" onClick={menuShowChange} className='nav__link'>Главная</NavLink></li>
                            <li className='nav__item'><NavLink to="/products" onClick={menuShowChange} className='nav__link'>Товары</NavLink></li>
                            <li className='nav__item'><NavLink to="/blog" onClick={menuShowChange} className='nav__link'>Статьи</NavLink></li>
                            {/* <li className='nav__item'><NavLink to="/contacts" className='nav__link'>Контакты</NavLink></li> */}
                        </ul>
                        <button onClick={menuShowChange} className='mobile__menu'><i class="bi bi-list"></i> Меню</button>
                    </nav>
                    
                    <div ref={authRef} className='auth'>
                        <button onClick={AuthShowChange}><i className="bi bi-person-circle"></i> <span>Личный кабинет</span></button>
                        <ul className={authShow ? 'auth__items show' : 'auth__items' }>
                            <li className='auth__item'><NavLink to='/login' onClick={AuthShowChange} className='auth__link'>Вход</NavLink></li>
                            <li className='auth__item'><NavLink to='/register' onClick={AuthShowChange} className='auth__link'>Регистрация</NavLink></li>
                        </ul>
                    </div>
                </div>
            </header>
}

export default Header
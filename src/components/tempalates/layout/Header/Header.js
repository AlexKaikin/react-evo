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

    return  <header className='header'>
                <div className='container'>
                    <div className='header__logo'>EVO</div>
                    <nav className='header__nav nav'>
                        <ul className='nav__items'>
                            <li className='nav__item'><NavLink to="/" className='nav__link'>Главная</NavLink></li>
                            <li className='nav__item'><NavLink to="/products" className='nav__link'>Товары</NavLink></li>
                            <li className='nav__item'><NavLink to="/blog" className='nav__link'>Статьи</NavLink></li>
                            <li className='nav__item'><NavLink to="/contacts" className='nav__link'>Контакты</NavLink></li>
                        </ul>
                    </nav>
                    <div ref={authRef} className='auth'>
                        <button onClick={AuthShowChange}><i className="bi bi-person-circle"></i> Личный кабинет</button>
                        <ul className={authShow ? 'auth__items show' : 'auth__items' }>
                            <li className='auth__item'><NavLink to='/login' onClick={AuthShowChange} className='auth__link'>Вход</NavLink></li>
                            <li className='auth__item'><NavLink to='/register' onClick={AuthShowChange} className='auth__link'>Регистрация</NavLink></li>
                        </ul>
                    </div>
                </div>
            </header>
}

export default Header
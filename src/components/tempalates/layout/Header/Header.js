import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'


const Header = props => {
    const [authShow, setAuthShow] = useState('')
    const AuthShowChange = () => {
        (authShow) ? setAuthShow('') : setAuthShow('show')
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
                    <div className='auth'>
                        <button onClick={AuthShowChange}><i className="bi bi-person-circle"></i> Личный кабинет <i className="bi bi-chevron-down"></i></button>
                        <ul className={`auth__items ${authShow}`}>
                            <li className='auth__item'><NavLink to='/login' className='auth__link'>Вход</NavLink></li>
                            <li className='auth__item'><NavLink to='/register' className='auth__link'>Регистрация</NavLink></li>
                        </ul>
                    </div>
                </div>
            </header>
}

export default Header
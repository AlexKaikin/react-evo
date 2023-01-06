import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { navigationSelector } from '../../../redux/navigationSlice'


const Header: React.FC = props => {
    const [authShow, setAuthShow] = useState<boolean>(false)
    const { navigation } = useSelector(navigationSelector)
    
    const AuthShowChange = () => {
        if(authShow){
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
        if(authRef.current && !path.includes(authRef.current)) {
            setAuthShow(false)
            document.body.removeEventListener('click', bodyClick)
        }
    }

    const [menuShow, setMenuShow] = useState<boolean>(false)
    const menuShowChange = () => {
        if(menuShow){
            setMenuShow(false)
            document.body.removeEventListener('click', bodyClick2)
        } else {
            setMenuShow(true)
            document.body.addEventListener('click', bodyClick2)
        }
    }
    const menuRef = useRef<HTMLElement>(null)
    const bodyClick2 = (e: MouseEvent) => {
        const _e = e as BodyClickType
        const path = _e.path || (e.composedPath && e.composedPath()) // for firefox browser
        if(menuRef.current && !path.includes(menuRef.current)) {
            setMenuShow(false)
            document.body.removeEventListener('click', bodyClick2)
        }
    }

    return  <header className='header'>
                <div className='container'>
                    <div className='header__logo'>EVO</div>
                    <nav ref={menuRef} className='header__nav nav'>
                        <ul className={menuShow ? 'nav__items show' : 'nav__items'}>
                            <Nav items={navigation} menuShowChange={menuShowChange} />
                        </ul>
                        <button onClick={menuShowChange} className='mobile__menu'><i className="bi bi-list"></i> Меню</button>
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

type BodyClickType = MouseEvent & { path: Node[] } // добавить path в event

const Nav: React.FC<PropsType> = props => {
    return  <>
                {
                    props.items.map(item => <li key={item.id} className='nav__item'><NavLink to={item.url} onClick={props.menuShowChange} className='nav__link'>{item.title}</NavLink></li>)
                }
            </>
}

type PropsType = {
    items: NavigationItemType[],
    menuShowChange: () => void,
}

type NavigationItemType = {
    id: number, 
    title: string, 
    url: string,
  }
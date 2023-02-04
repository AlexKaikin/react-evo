import React, { useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import cn from 'classnames'
import { useAppDispatch } from '../../../../store/store'
import { AuthType, logout } from '../../../../store/account/authSlice'
import AuthSkeleton from '../../../common/Skeleton/AuthSkeleton/AuthSkeleton'

const Account: React.FC<PropsType> = ({ auth }) => {
  const dispatch = useAppDispatch()
  const [authShow, setAuthShow] = useState<boolean>(false)

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

  const navigate = useNavigate()
  const logoutClick = () => {
    dispatch(logout())
    window.localStorage.removeItem('token')
    AuthShowChange()
    navigate('/login')
  }

  if(auth.status === 'loading') return <AuthSkeleton />

  return (
    <div ref={authRef} className="auth">
      <button className="auth__btn" onClick={AuthShowChange}>
        <i className="bi bi-person-circle"></i>{' '}
        <span>{auth.data ? auth.data.fullName : 'Личный кабинет'}</span>
      </button>
      <ul className={cn('auth__items', { show: authShow })}>
        {auth.data ? (
          <>
            <li className="auth__item">
              <NavLink
                to="/profile"
                onClick={AuthShowChange}
                className="auth__link"
              >
                Профиль
              </NavLink>
            </li>

            {auth.data.role === 'admin' && (
              <li className="auth__item">
                <NavLink
                  to="/admin/dashboard"
                  onClick={AuthShowChange}
                  className="auth__link"
                >
                  Менеджер
                </NavLink>
              </li>
            )}
            <li className="auth__item">
              <button onClick={logoutClick} className="auth__link">
                Выход
              </button>
            </li>
          </>
        ) : (
          <>
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
          </>
        )}
      </ul>
    </div>
  )
}

export default Account

type BodyClickType = MouseEvent & { path: Node[] } // добавить path в event

type PropsType = {
  auth: AuthType
}

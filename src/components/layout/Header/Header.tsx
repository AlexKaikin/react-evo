import React from 'react'
import { useSelector } from 'react-redux'
import { navigationSelector } from '../../../store/navigation/navigationSlice'
import Nav from './Nav/Nav'
import './Header.scss'
import { authSelector } from '../../../store/account/authSlice'
import Logo from './Logo/Logo'
import Account from './Account/Account'

const Header: React.FC = (props) => {
  const { navigation } = useSelector(navigationSelector)
  const auth = useSelector(authSelector)

  return (
    <header className="header">
      <div className="container">
        <Logo />
        <Nav items={navigation} />
        <Account auth={auth} />
      </div>
    </header>
  )
}

export default React.memo(Header)

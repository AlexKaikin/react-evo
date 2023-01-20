import React from 'react'
import { NavLink } from 'react-router-dom'
import { NavigationItemType } from '../../../../redux/navigationSlice'


const Nav: React.FC<PropsType> = props => {
    
    return  <>
                {
                    props.items.map(item => <li key={item.id} className='nav__item'><NavLink to={item.url} onClick={props.menuShowChange} className='nav__link'>{item.title}</NavLink></li>)
                }
            </>
}

export default React.memo(Nav)

type PropsType = {
    items: NavigationItemType[],
    menuShowChange: () => void,
}
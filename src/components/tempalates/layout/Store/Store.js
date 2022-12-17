import React from 'react'
import { NavLink } from 'react-router-dom'


const Store = props => {
    return  <section className='store'>
                <div className="container">
                    <div className="store__search">
                        <form action="#" className="store__search form">
                            <input type="text" placeholder="Найти товар..." required />
                            <button className=""><i className="bi bi-search"></i></button>
                        </form>
                    </div>

                    <div className='store__info'>
                        <NavLink to='#' className='bookmark'><i className="bi bi-bookmarks"></i></NavLink>
                        <NavLink to='#' className=''><i className="bi bi-heart"></i></NavLink>
                        <button className="cart"><i className="bi bi-bag"></i></button>
                    </div>
                </div>
            </section>
}

export default Store
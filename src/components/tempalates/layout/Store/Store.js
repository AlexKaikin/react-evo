import React, { useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'


const Store = props => {
    const [showCart, setShowCart] = useState(false)

    const showCartChange = () => {
        if(showCart){
            setShowCart(false)
            document.body.removeEventListener('click', bodyClick)
        } else {
            setShowCart(true)
            document.body.addEventListener('click', bodyClick)
        }
    }

    const cartRef = useRef()

    const bodyClick = (e) => {
        if(!e.path.includes(cartRef.current)) {
            setShowCart(false)
            document.body.removeEventListener('click', bodyClick)
        }
    }


    return  <section className='store'>
                <div className="container">
                    <div className="store__search">
                        <form action="#" className="store__search form">
                            <input type="text" placeholder="Найти товар..." required />
                            <button className=""><i className="bi bi-search"></i></button>
                        </form>
                    </div>

                    <div className='store__info'>
                        <NavLink to='/compare' className='bookmark'><i className="bi bi-bookmarks"></i></NavLink>
                        <NavLink to='/favorites' className=''><i className="bi bi-heart"></i></NavLink>
                        <div ref={cartRef} className='cart-block'>
                            <button onClick={showCartChange} className="cart">
                                <i className="bi bi-bag"></i>
                            </button>
                            <div className={showCart ? 'cart__items show' : 'cart__items'}>
                                <div>В корзине пусто</div>
                                <Link to='/cart' className='cart-link'>Перейти в корзину</Link>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>
}

export default Store
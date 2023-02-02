import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Search from './Search/Search'
import './Cloud.scss'
import { getStore, storeSelector } from '../../../../store/products/storeSlice'
import { useAppDispatch } from '../../../../store/store'
import Focus from './Focus/Focus'
import { productsSelector } from '../../../../store/products/productsSlice'

const Cloud: React.FC = (props) => {
  const { query } = useSelector(productsSelector)
  const { cartItems, compareItems, favoritesItems } = useSelector(storeSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getStore())
  }, [dispatch])

  return (
    <section className="cloud store">
      <div className="container">
        <Search query={query} />
        <Focus
          cartItems={cartItems}
          compareItems={compareItems}
          favoritesItems={favoritesItems}
        />
      </div>
    </section>
  )
}

export default Cloud

import React from 'react'
import { useSelector } from 'react-redux'
import { storeSelector } from '../../../../store/products/storeSlice'
import Cloud from '../../../layout/Cloud/Product/Cloud'
import FavoriteItems from './FavoriteItems/FavoriteItems'
import './Favorites.scss'

const Favorites: React.FC = (props) => {
  const { favoritesItems } = useSelector(storeSelector)

  return (
    <>
      <Cloud />
      <div className="section products">
        <div className="container">
          <div className="section__title">Избранные товары</div>
          <FavoriteItems favoritesItems={favoritesItems} />
        </div>
      </div>
    </>
  )
}

export default Favorites

import React from 'react'
import './CategoriesSkeleton.scss'

const CategoriesSkeleton: React.FC = (props) => {
  return (
    <div className="filter__category skeleton">
      <button className="category__mobile">
        <i></i>
        <span></span>
      </button>
      <div className='category__items'>
        <button className='btn'></button>
        <button className='btn'></button>
        <button className='btn'></button>
        <button className='btn'></button>
      </div>
    </div>
  )
}

export default CategoriesSkeleton

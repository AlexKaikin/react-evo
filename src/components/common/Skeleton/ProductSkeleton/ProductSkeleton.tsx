import React from 'react'
import './ProductSkeleton.scss'

const ProductSkeleton: React.FC = (props) => {
  return (
    <div className="product__item skeleton">
      <div className="product__img">
        <div></div>
      </div>
      <div className="product__title"></div>
      <div className="product__price">
        <span></span> <span></span>
      </div>
    </div>
  )
}

export default React.memo(ProductSkeleton)

import React from 'react'

const ProductSkeleton: React.FC = (props) => {
  return (
    <div className="product__item skeleton">
      <div className="product__img">
        <div></div>
      </div>
      <div className="product__title">Шу Пуэр Оолонг</div>
      <div className="product__price">
        <span>500 руб.</span> <span>100 грамм</span>
      </div>
    </div>
  )
}

export default React.memo(ProductSkeleton)

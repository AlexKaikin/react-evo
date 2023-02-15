import React from 'react'
import './Reviews.scss'
import CreateReview from './CreateReview/CreateReview'
import ReviewItems from './ReviewItems/ReviewItems'

const Reviews: React.FC<PropsType> = ({product_Id}) => {

  return (
    <div className="product__reviews review">
      <CreateReview product_Id={product_Id} />
      <ReviewItems product_Id={product_Id} />
    </div>
  )
}

export default Reviews

type PropsType = {
  product_Id: string
}



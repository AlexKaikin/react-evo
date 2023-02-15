import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  getReviews,
  reviewSelector,
} from '../../../../../../../store/products/reviewsSlice'
import { useAppDispatch } from '../../../../../../../store/store'
import defautAvatar from '../../../../../../../assets/img/defaultAvatar.png'
import Rating from '../../../../../../common/Rating/Rating'

const ReviewItems: React.FC<PropsType> = ({ product_Id }) => {
  const { reviewItems } = useSelector(reviewSelector)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getReviews(product_Id))
  }, [dispatch, product_Id])

  return (
    <div className="reviews__items">
      {reviewItems.map((item) => (
        <div key={item.id} className="reviews__item item">
          <div className="item__user">
            <div className="item__avatar">
              <img
                src={item.user.avatarUrl ? item.user.avatarUrl : defautAvatar}
                alt="avatar"
              />
            </div>
            <div className="item__name">{item.user.fullName}</div>
          </div>
          <div className="item__body">
            <div className="item__rating">
              <Rating number={item.rating} />
            </div>
            {item.body}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ReviewItems

type PropsType = {
  product_Id: string
}

import React from 'react'
import { Link } from 'react-router-dom'
import { ReviewItemType } from '../../../../../store/products/reviewsSlice'
import Modal from '../../../../common/Modal/Modal'
import Rating from '../../../../common/Rating/Rating'

const ReviewFull: React.FC<PropsType> = ({ reviewShow, modaltoggle }) => {
  console.log(typeof reviewShow.product === 'object')
  return (
    <Modal title={`Отзыв`} modaltoggle={modaltoggle}>
      <div className="review-full items">
        <div className="item">
          <Rating number={reviewShow.rating} />
        </div>
        <div className="item">
          {reviewShow.body.split('\n').map((item, i) => (
            <p key={i}>{item}</p>
          ))}
        </div>
        <div className="item">
          Товар{' '}
          {typeof reviewShow.product === 'object' && (
            <Link to={`/products/${reviewShow.product.id}`}>
              {reviewShow.product.title}
            </Link>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default ReviewFull

type PropsType = {
  reviewShow: ReviewItemType
  modaltoggle: () => void
}

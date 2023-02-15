import React, { useState } from 'react'
import { ReviewItemType } from '../../../../../store/products/reviewsSlice'
import Rating from '../../../../common/Rating/Rating'
import ReviewFull from '../ReviewFull/ReviewFull'

const ReviewItems: React.FC<PropsType> = ({ items }) => {
  const [reviewShow, setReviewShow] = useState<ReviewItemType | null>(null)
  const modaltoggle = () => setReviewShow(null)
  if (!items.length) return <div>Заказов нет</div>

  return (
    <div>
      <div className="review__items">
        <div className="review__item">
          <div>Отзыв</div>
          <div>Рейтинг</div>
          <div>Создан</div>
          <div>Статус</div>
        </div>
        {items.map((item) => (
          <div key={item.id} className="review__item">
            <button onClick={() => setReviewShow(item)} className='item__title'>
                {item.body.slice(0, 30) + '...'}
            </button>
            <div>
              <Rating number={item.rating} />
            </div>
            <div>{item.created}</div>
            <div>{item.published}</div>
          </div>
        ))}
      </div>

      {reviewShow && (
        <ReviewFull reviewShow={reviewShow} modaltoggle={modaltoggle} />
      )}
    </div>
  )
}

export default ReviewItems

type PropsType = {
  items: ReviewItemType[]
}

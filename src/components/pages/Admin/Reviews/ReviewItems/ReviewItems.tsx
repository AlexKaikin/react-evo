import React, { useState } from 'react'
import {
  deleteReview,
  ReviewItemType,
} from '../../../../../store/admin/products/reviewsAdminSlice'
import { useAppDispatch } from '../../../../../store/store'
import Modal from '../../../../common/Modal/Modal'
import Rating from '../../../../common/Rating/Rating'
import ReviewFull from '../ReviewFull/ReviewFull'

const ReviewItems: React.FC<PropsType> = ({ items, updateComponent }) => {
  const dispatch = useAppDispatch()
  const [reviewShow, setReviewShow] = useState<ReviewItemType | null>(null)
  const [deleteShow, setdeleteShow] = useState<number | null>(null)
  const modaltoggle = () => setReviewShow(null)
  const modaltoggle2 = () => setdeleteShow(null)
  if (!items.length) return <div>Отзывов нет</div>

  return (
    <div>
      <div className="review__items">
        <div className="review__item">
          <div>Отзыв</div>
          <div>Рейтинг</div>
          <div>Создан</div>
          <div>Статус</div>
          <div></div>
          <div></div>
        </div>
        {items.map((item) => (
          <div key={item.id} className="review__item">
            <div>{item.body.slice(0, 30) + '...'}</div>
            <div>
              <Rating number={item.rating} />
            </div>
            <div>{item.created}</div>
            <div>{item.published}</div>
            <button
              onClick={() => setReviewShow(item)}
              className="btn btn-light p10"
            >
              <i className="bi bi-pencil-square"></i>
            </button>
            <button onClick={() => setdeleteShow(item.id)} className="btn btn-light p10">
              <i className="bi bi-trash3"></i>
            </button>
          </div>
        ))}
      </div>

      {reviewShow && (
        <ReviewFull reviewShow={reviewShow} modaltoggle={modaltoggle} />
      )}

      {deleteShow && (
        <Modal title="Удалить отзыв" modaltoggle={modaltoggle2}>
          <p>Вы действительно хотите удалить отзыв?</p>
          <div className="button-wrapper">
            <button
              className="btn btn-warning"
              onClick={() => {
                dispatch(deleteReview(deleteShow))
                setdeleteShow(null)
                updateComponent()
              }}
            >
              Удалить
            </button>
            <button className="btn btn-light" onClick={modaltoggle2}>
              Отмена
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default ReviewItems

type PropsType = {
  items: ReviewItemType[],
  updateComponent: () => void,
}

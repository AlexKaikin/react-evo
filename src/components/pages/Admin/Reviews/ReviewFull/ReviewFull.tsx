import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ReviewItemType,
  updateReview,
} from '../../../../../store/admin/products/reviewsAdminSlice'
import { useAppDispatch } from '../../../../../store/store'
import Modal from '../../../../common/Modal/Modal'
import Rating from '../../../../common/Rating/Rating'

const ReviewFull: React.FC<PropsType> = ({ reviewShow, modaltoggle }) => {
  const dispatch = useAppDispatch()
  const [modalShow, setModalShow] = useState<boolean>(false)
  const modaltoggle2 = () => setModalShow(!modalShow)

  const formState: ReviewItemType = {
    _id: reviewShow._id,
    id: reviewShow.id,
    rating: reviewShow.rating,
    body: reviewShow.body,
    published: reviewShow.published,
    created: reviewShow.created,
    updated: reviewShow.updated,
    product: reviewShow.product,
  }

  const formSubmit = async (values: ReviewItemType) => {
    const res = await dispatch(updateReview(values))
    if (res === 'ok') setModalShow(true)
  }

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
        <div className="item">
          <Formik
            initialValues={formState}
            validate={formValidate}
            onSubmit={formSubmit}
          >
            <Form>
              <div className="review__status">
                Статус:
                <Field as="select" type="text" name="published">
                  <option>На модерации</option>
                  <option>Одобрен</option>
                  <option>Отклонён</option>
                </Field>
                <button type="submit" className="btn">
                  Обновить статус
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
      {modalShow && (
        <Modal title="Обновление заказа" modaltoggle={modaltoggle2}>
          <p>Статус обновлён</p>
        </Modal>
      )}
    </Modal>
  )
}

export default ReviewFull

type PropsType = {
  reviewShow: ReviewItemType
  modaltoggle: () => void
}

const formValidate = (values: ReviewItemType) => {
  const errors = {}
  return errors
}

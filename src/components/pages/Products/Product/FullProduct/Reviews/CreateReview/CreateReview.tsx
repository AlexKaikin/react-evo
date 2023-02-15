import React, { useState } from 'react'
import { Field, Form, Formik } from 'formik'
import { useAppDispatch } from '../../../../../../../store/store'
import {
  createReview,
  ReviewItemType,
} from '../../../../../../../store/products/reviewsSlice'
import Modal from '../../../../../../common/Modal/Modal'
import { useSelector } from 'react-redux'
import { authSelector } from '../../../../../../../store/account/authSlice'
import { Link } from 'react-router-dom'

const CreateReview: React.FC<PropsType> = ({ product_Id }) => {
  const { data } = useSelector(authSelector)
  const [modalShow, setModalShow] = useState(false)
  const modaltoggle2 = () => setModalShow(!modalShow)

  const formState: ReviewItemType = {
    _id: '',
    id: 0,
    rating: 0,
    body: '',
    published: '',
    created: '',
    updated: '',
    product: product_Id,
  }

  const dispatch = useAppDispatch()
  const formSubmit = async (values: ReviewItemType, { resetForm }: any) => {
    const res = await dispatch(createReview(values))
    res === 'ok' && setModalShow(true)
    console.log(resetForm)
    resetForm()
  }

  if (!data)
    return (
      <div className='not-auth'>
        Чтобы написать отзыв нужно авторизоваться. <Link to="/login">Вход</Link>{' '}
        | <Link to="/register">Регистрация</Link>
      </div>
    )

  return (
    <>
      <div className="review__title">Оставить отзыв</div>
      <Formik
        initialValues={formState}
        validate={formValidate}
        onSubmit={formSubmit}
      >
        <Form className="form">
          <div className="form__select">
            <label>Рейтинг</label>
            <Field type="text" as="select" name="rating">
              <option value="0">Без рейтинга</option>
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </Field>
          </div>
          <div className="form__field">
            <label>Отзыв</label>
            <Field type="text" name="body" as="textarea" required />
          </div>

          <button type="submit" className="form__btn">
            Отправить
          </button>
        </Form>
      </Formik>
      {modalShow && (
        <Modal title="" modaltoggle={modaltoggle2}>
          Отзыв отправлен на модерации
        </Modal>
      )}
    </>
  )
}

export default CreateReview

type PropsType = {
  product_Id: string
}

const formValidate = (values: ReviewItemType) => {
  const errors = {}
  return errors
}

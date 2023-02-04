import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import {
  authSelector,
  login,
  LoginType,
} from '../../../../store/account/authSlice'
import { useAppDispatch } from '../../../../store/store'
import './Login.scss'

const Login: React.FC = (props) => {
  const dispatch = useAppDispatch()
  const auth = useSelector(authSelector)
  const formState: LoginType = {
    email: '',
    password: '',
  }

  if (auth.data) return <Navigate to="/profile" />

  return (
    <div className="section auth">
      <div className="container">
        <div className="section__title">Вход</div>
        <Formik
          initialValues={formState}
          validate={formValidate}
          onSubmit={(values) => dispatch(login(values))}
        >
          <Form className="form">
            <div className="form__field">
              <label>Логин</label>
              <Field type="text" name="email" required />
            </div>

            <div className="form__field">
              <label>Пароль</label>
              <Field type="password" name="password" required />
            </div>

            <p>
              У вас нет аккаунта? <Link to="/register">Регистрация</Link>
            </p>

            <button type="submit" className="form__btn">
              Отправить
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default Login

const formValidate = (values: LoginType) => {
  const errors = {}
  return errors
}

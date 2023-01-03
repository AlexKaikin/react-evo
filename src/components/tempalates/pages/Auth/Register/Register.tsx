import React from 'react'
import { Link } from 'react-router-dom'


const Register: React.FC = props => {
    return  <div className='section auth'>
                <div className='container'>
                    <div className='section__title'>Регистрация</div>
                    <form className="form">
                            
                        <div className="form__field">
                            <label>Логин</label>
                            <input type="text" name="login"  />
                        </div>

                        <div className="form__field">
                            <label>Почта</label>
                            <input type="email" name="email"  />
                        </div>

                        <div className="form__field">
                            <label>Пароль</label>
                            <input type="password" name="password"  />
                        </div>

                        <p>У вас есть аккаунт? <Link to='/login'>Вход</Link></p>

                        <button className='form_btn'>Отправить</button>

                    </form>
                </div>
            </div>
}

export default Register
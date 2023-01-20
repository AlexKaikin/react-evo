import React from 'react'
import { Link } from 'react-router-dom'


const Login: React.FC = props => {
    return  <div className='section auth'>
                <div className='container'>
                    <div className='section__title'>Вход</div>
                    <form className="form">
                            
                        <div className="form__field">
                            <label>Логин</label>
                            <input type="text" name="login"  />
                        </div>

                        <div className="form__field">
                            <label>Пароль</label>
                            <input type="password" name="password"  />
                        </div>

                        <p>У вас нет аккаунта? <Link to='/register'>Регистрация</Link></p>

                        <button className='form_btn'>Отправить</button>

                    </form>
                </div>
            </div>
}

export default Login
import React from 'react'


const Register = props => {
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

                        <button className='form_btn'>Отправить</button>

                    </form>
                </div>
            </div>
}

export default Register
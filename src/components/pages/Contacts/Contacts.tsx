import React from 'react'

const Contacts: React.FC = (props) => {
  return (
    <div className="section">
      <div className="container">
        <div className="section__title">Контакты</div>
        <h3>Написать сообщение администратору</h3>
        <form className="form">
          <div className="form__field">
            <label>Тема</label>
            <input type="text" name="login" />
          </div>

          <div className="form__field">
            <label>Сообщение</label>
            <textarea />
          </div>

          <button className="btn">Отправить</button>
        </form>
      </div>
    </div>
  )
}

export default Contacts

import React from 'react'
import Aside from '../../../layout/Aside/admin/Aside'
import './Messages.scss'

const Messages: React.FC = (props) => {
  return (
    <div className="two">
      <Aside />
      <div className="section messages">
        <div className="container">
          <div>Messages</div>
        </div>
      </div>
    </div>
  )
}

export default Messages

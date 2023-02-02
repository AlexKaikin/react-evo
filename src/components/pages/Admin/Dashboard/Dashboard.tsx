import React from 'react'
import Aside from '../../../layout/Aside/admin/Aside'
import './Dashboard.scss'

const Dashboard: React.FC = (props) => {
  return (
    <div className="two">
      <Aside />
      <div className="section Dashboard">
        <div className="container">
          <div>Dashboard</div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

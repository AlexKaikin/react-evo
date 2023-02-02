import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { authSelector } from '../../../../store/account/authSlice'
import './Profile.scss'
import defaulAvatar from '../../../../assets/img/defaultAvatar.png'
import Aside from '../../../layout/Aside/profile/Aside'

const Profile: React.FC = (props) => {
  const auth = useSelector(authSelector)

  if (!auth.data) {
    return <Navigate to="/login" />
  }

  return (
    <div className="two">
      <Aside />
      <div className="section profile">
        <div className="container">
          <div className='profile__columns'>
            <div className="profile__left">
              <div className="profile__avatar">
                <img
                  src={auth.data.avatarUrl ? auth.data.avatarUrl : defaulAvatar}
                  alt="avatar"
                />
              </div>
            </div>
            <div className="profile__right">
              <div className="profile__name">{auth.data.fullName}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

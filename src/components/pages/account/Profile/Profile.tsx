import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { authSelector } from '../../../../store/authSlice'

const Profile: React.FC = (props) => {
  const auth = useSelector(authSelector)

  if (!auth.data) {
    return <Navigate to="/login" />
  }

  return <>Профиль</>
}

export default Profile

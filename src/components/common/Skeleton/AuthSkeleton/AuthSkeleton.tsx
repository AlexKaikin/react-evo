import React from 'react'
import './AuthSkeleton.scss'

const AuthSkeleton: React.FC = (props) => {
  return (
    <div className="auth skeleton">
      <button className="auth__btn">
        <i></i> <span></span>
      </button>
    </div>
  )
}

export default AuthSkeleton

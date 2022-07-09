import React from 'react'
import MyLink from './MyLink'

const ProfileLink = ({to, children}) => {
  return (
    <div className='profile-links'>
        <MyLink to={to}>{children}</MyLink>
    </div>
  )
}

export default ProfileLink
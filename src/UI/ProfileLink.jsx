import React from 'react'
import MyLink from './MyLink'

const ProfileLink = ({to, children}) => {
  return (
    <div>
        <MyLink to={to}>{children}</MyLink>
        <span className='triangle'>&#9660;</span>
    </div>
  )
}

export default ProfileLink
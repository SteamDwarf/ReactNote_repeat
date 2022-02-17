import React from 'react'
import './InvalidMessage.scss'

function InvalidMessage({children}) {
    return (
        <div className='message'>
            {children}
        </div>
    )
}

export default InvalidMessage

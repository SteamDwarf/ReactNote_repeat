import React from 'react'
import './ErrorMessage.scss'

function ErrorMessage({error}) {
    return (
        <div className='error-message_block'>
            <h1>Произошла ошибка!</h1>
            <div className='message'>{error}</div>
        </div>
    )
}

export default ErrorMessage

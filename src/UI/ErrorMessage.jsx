import React from 'react'
import './ErrorMessage.scss'
import '../styles/themes/components/error-message.scss';
import { useSelector } from 'react-redux';

function ErrorMessage({error}) {
    const {theme} = useSelector(state => state.ui);

    return (
        <div className={`error-message_block ${theme}`}>
            <h1>Произошла ошибка!</h1>
            <div className='message'>{error}</div>
        </div>
    )
}

export default ErrorMessage

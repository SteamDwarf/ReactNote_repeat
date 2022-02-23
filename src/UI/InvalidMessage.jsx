import React from 'react'
import { useSelector } from 'react-redux';
import './InvalidMessage.scss'
import '../styles/themes/components/invalid-message.scss';

function InvalidMessage({children}) {
    const {theme} = useSelector(state => state.ui);

    return (
        <div className={`message ${theme}`}>
            {children}
        </div>
    )
}

export default InvalidMessage

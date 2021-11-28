import React from 'react'
import classes from './InvalidMessage.module.css'

function InvalidMessage({children}) {
    return (
        <div className={classes.message}>
            {children}
        </div>
    )
}

export default InvalidMessage

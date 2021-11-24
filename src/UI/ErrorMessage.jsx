import React from 'react'
import classes from './ErrorMessage.module.css'

function ErrorMessage({error}) {
    console.log(error);
    return (
        <div className={classes.block}>
            <h1>Произошла ошибка!</h1>
            <div className={classes.errorMessage}>{error}</div>
        </div>
    )
}

export default ErrorMessage

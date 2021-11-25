import React from 'react'
import classes from './MyTextarea.module.css'

function MyTextArea({...props}) {
    return (
        <textarea className={classes.textArea} {...props}/>
    );
}

export default MyTextArea

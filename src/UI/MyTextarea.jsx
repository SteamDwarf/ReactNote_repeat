import React from 'react'
import classes from './MyTextarea.module.css'
import '../styles/themes/components/textarea.scss';

function MyTextArea({...props}) {
    return (
        <textarea className={`${classes.textArea} textarea light`} {...props}/>
    );
}

export default MyTextArea

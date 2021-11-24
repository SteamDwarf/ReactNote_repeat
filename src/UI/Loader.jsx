import React from 'react'
import classes from './Loader.module.css'

function Loader({text}) {
    return (
        <div className={classes.loadingBlock}>
            <h1 className='title'>{text}</h1>
            <div className={classes.spinner}></div>
        </div>
    )
}

export default Loader

import React from 'react'
import classes from './Loader.module.css';
import '../styles/themes/components/loader.scss';

function Loader({text}) {
    return (
        <div className={classes.loadingBlock}>
            <h1 className='title'>{text}</h1>
            <div className={`${classes.spinner} spinner light`}></div>
        </div>
    )
}

export default Loader

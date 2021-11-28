import React, { useEffect, useRef, useState } from 'react'
import ErrorMessage from '../UI/ErrorMessage';
import Loader from '../UI/Loader';
import MyButton from '../UI/MyButton';
import classes from './MyModal.module.css'

function MyModal({children, toggleModal, isLoading, error, setError,loadingText}) {
    if(isLoading) {
        return (
            <div className={classes.modal} onClick={toggleModal}>
                <div onClick={(e) => e.stopPropagation()} className={classes.modalContent}>
                    <span onClick={toggleModal} className={classes.closeBtn}>&times;</span>
                    <Loader text={loadingText}/>
                </div>
            </div>
        )
    }
    if(error) {
        return (
            <div className={classes.modal} onClick={toggleModal}>
                <div onClick={(e) => e.stopPropagation()} className={classes.modalContent}>
                    <span onClick={toggleModal} className={classes.closeBtn}>&times;</span>
                    <ErrorMessage error={error}/>
                    <MyButton color='blue' onClick={() => setError(false)}>Повторить</MyButton>
                </div>
            </div>
        )
    }

    return (
        <div className={classes.modal} onClick={toggleModal}>
            <div onClick={(e) => e.stopPropagation()} className={classes.modalContent}>
                <span onClick={toggleModal} className={classes.closeBtn}>&times;</span>
                {children}
            </div>
        </div>
    )
    
}

export default MyModal

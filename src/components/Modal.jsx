import React, { useEffect, useRef, useState } from 'react'
import ErrorMessage from '../UI/ErrorMessage';
import Loader from '../UI/Loader';
import Button from '../UI/Button';
import './Modal.scss';

function Modal({children, toggleModal, isLoading, error, setError,loadingText}) {
    if(isLoading) {
        return (
            <div className={`modal`} onClick={toggleModal}>
                <div onClick={(e) => e.stopPropagation()} className={`modal_content`}>
                    <span onClick={toggleModal} className={`close-btn`}>&times;</span>
                    <Loader text={loadingText}/>
                </div>
            </div>
        )
    }
    if(error) {
        return (
            <div className={`modal`} onClick={toggleModal}>
                <div onClick={(e) => e.stopPropagation()} className={`modal_content`}>
                    <span onClick={toggleModal} className={`close-btn`}>&times;</span>
                    <ErrorMessage error={error}/>
                    <Button color='blue' onClick={() => setError(false)}>Повторить</Button>
                </div>
            </div>
        )
    }

    return (
        <div className={`modal`} onClick={toggleModal}>
            <div onClick={(e) => e.stopPropagation()} className={`modal_content`}>
                <span onClick={toggleModal} className={`close-btn`}>&times;</span>
                {children}
            </div>
        </div>
    )
    
}

export default Modal

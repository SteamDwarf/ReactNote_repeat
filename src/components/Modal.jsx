import React, { useEffect, useRef, useState } from 'react'
import ErrorMessage from '../UI/ErrorMessage';
import Loader from '../UI/Loader';
import Button from '../UI/Button';
import './Modal.scss';
import '../styles/themes/components/modal.scss';
import { useSelector } from 'react-redux';

function Modal({children, toggleModal, isLoading, error, clearError,loadingText}) {
    const {theme} = useSelector(state => state.ui);

    if(isLoading) {
        return (
            <div className={`modal ${theme}`} onClick={toggleModal}>
                <div onClick={(e) => e.stopPropagation()} className={`modal_content`}>
                    <span onClick={toggleModal} className={`close-btn`}>&times;</span>
                    <Loader text={loadingText}/>
                </div>
            </div>
        )
    }
    if(error) {
        return (
            <div className={`modal ${theme}`} onClick={toggleModal}>
                <div onClick={(e) => e.stopPropagation()} className={`modal_content`}>
                    <span onClick={toggleModal} className={`close-btn`}>&times;</span>
                    <ErrorMessage error={error}/>
                    <Button onClick={clearError}>Повторить</Button>
                </div>
            </div>
        )
    }

    return (
        <div className={`modal ${theme}`} onClick={toggleModal}>
            <div onClick={(e) => e.stopPropagation()} className={`modal_content`}>
                <span onClick={toggleModal} className={`close-btn`}>&times;</span>
                {children}
            </div>
        </div>
    )
    
}

export default Modal

import React, { useRef } from 'react'
import classes from './MyModal.module.css'

function MyModal({children, isShown, toggleModal}) {

    if(isShown) {
        return (
            <div className={classes.modal} onClick={toggleModal}>
                <div onClick={(e) => e.stopPropagation()} className={classes.modalContent}>
                    <span onClick={toggleModal} className={classes.closeBtn}>&times;</span>
                    {children}
                </div>
            </div>
        )
    } else {
        return null;
    }
    
}

export default MyModal

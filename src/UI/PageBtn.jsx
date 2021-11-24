import React from 'react'
import classes from './PageBtn.module.css';

function PageBtn({children, isActive, ...props}) {
    let className = `${classes.btn} ${isActive ? classes.active : ''}`;
    
    return (
        <button {...props} className={className}> 
            {children}
        </button>
    )
}

export default PageBtn

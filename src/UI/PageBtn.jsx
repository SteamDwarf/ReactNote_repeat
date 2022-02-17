import React from 'react'
import './PageBtn.scss';
import '../styles/themes/components/page-button.scss';
import { useSelector } from 'react-redux';

function PageBtn({children, isActive, ...props}) {
    const {theme} = useSelector(state => state.ui);
    let className = `page-btn ${theme} ${isActive ? 'active' : ''}`;
    return (
        <button {...props} className={className}> 
            {children}
        </button>
    )
}

export default PageBtn

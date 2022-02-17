import React from 'react'
import { Link } from 'react-router-dom'
import './MyLink.scss';
import '../styles/themes/components/link.scss';
import { useSelector } from 'react-redux';

function MyLink({to, children}) {
    const {theme} = useSelector(state => state.ui);
    return (
        <Link className={`link ${theme}`} to={to}>
            <div>{children}</div>
            <span className='triangle'>&#9660;</span>
        </Link>
    )
}

export default MyLink

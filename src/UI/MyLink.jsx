import React from 'react'
import { Link } from 'react-router-dom'
import classes from './MyLink.module.css';
import '../styles/themes/components/link.scss';

function MyLink({to, children}) {
    return (
        <Link className={`${classes.link} link light`} to={to}>
            <div>{children}</div>
            <span className={classes.triangle}>&#9660;</span>
        </Link>
    )
}

export default MyLink

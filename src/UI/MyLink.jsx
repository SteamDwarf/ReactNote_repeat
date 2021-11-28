import React from 'react'
import { Link } from 'react-router-dom'
import classes from './MyLink.module.css'

function MyLink({to, children}) {
    return (
        <Link className={classes.link} to={to}>
            <div>{children}</div>
            <span className={classes.triangle}>&#9660;</span>
        </Link>
    )
}

export default MyLink

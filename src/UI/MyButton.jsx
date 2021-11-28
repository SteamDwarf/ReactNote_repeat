import React from "react";
import classes from './MyButton.module.css';

function MyButton({children, color, ...props}) {
    return (
        <button className={`${classes.btn} ${color}`} {...props}>{children}</button>
    );
}

export default MyButton;
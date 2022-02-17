import React from "react";
import classes from './MyButton.module.css';
import '../styles/themes/components/button.scss';

function MyButton({children, color, ...props}) {
    return (
        <button className={`${classes.btn} btn light`} {...props}>{children}</button>
    );
}

export default MyButton;
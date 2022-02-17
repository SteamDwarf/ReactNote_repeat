import React from "react";
import classes from './MyInput.module.css';
import '../styles/themes/components/input.scss';

function MyInput(props) {
    return (
        <input className={`${classes.input} input light`} {...props}/>
    );
}

export default MyInput;
import React from "react";
import './Input.scss';
import '../styles/themes/components/input.scss';
import { useSelector } from "react-redux";

function Input(props) {
    const {theme} = useSelector(state => state.ui);
    return (
        <input className={`input ${theme}`} {...props}/>
    );
}

export default Input;
import React from "react";
import './Button.scss';
import '../styles/themes/components/button.scss';
import { useSelector } from "react-redux";

function Button({children, color, ...props}) {
    const {theme} = useSelector(state => state.ui);

    return (
        <button className={`btn ${theme}`} {...props}>{children}</button>
    );
}

export default Button;
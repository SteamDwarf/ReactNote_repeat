import React from 'react'
import './Textarea.scss';
import '../styles/themes/components/textarea.scss';
import { useSelector } from 'react-redux';

function Textarea({...props}) {
    const {theme} = useSelector(state => state.ui);

    return (
        <textarea className={`textarea ${theme}`} {...props}/>
    );
}

export default Textarea

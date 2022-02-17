import React from 'react'
import './Loader.scss';
import '../styles/themes/components/loader.scss';
import { useSelector } from 'react-redux';

function Loader({text}) {
    const {theme} = useSelector(state => state.ui);
    return (
        <div className='loading-block'>
            <h1 className='title'>{text}</h1>
            <div className={`spinner ${theme}`}></div>
        </div>
    )
}

export default Loader

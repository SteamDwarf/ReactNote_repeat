import React from 'react'
import './Select.scss';
import '../styles/themes/components/select.scss';
import { useSelector } from 'react-redux';

function Select({name, options, defaultOption, value, onChange}) {
    const {theme} = useSelector(state => state.ui);

    return (
        <select
            className={`select ${theme}`} 
            name={name} 
            value={value} 
            onChange={(e) => onChange(e.target.value)}
        >
            <option disabled>{defaultOption}</option>

            {options.map((option) => 
                <option 
                    value={option.value} 
                    key={option.value}
                >
                    {option.text}
                </option>
            )}
        </select>
    )
}

export default Select

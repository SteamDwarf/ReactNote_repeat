import React from 'react'
import classes from './Select.module.css';
import '../styles/themes/components/select.scss';

function MySelect({name, options, defaultOption, value, onChange}) {
    return (
        <select
            className={`${classes.select} select light`} 
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

export default MySelect

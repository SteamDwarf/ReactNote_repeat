import React from 'react'
import classes from './MeSelect.module.css'

function MySelect({name, options, defaultOption, value, onChange}) {
    return (
        <select
            className={classes.select} 
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

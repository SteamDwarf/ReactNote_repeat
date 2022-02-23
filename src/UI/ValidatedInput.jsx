import React from 'react'
import Input from './Input'
import InvalidMessage from './InvalidMessage'

const ValidatedInput = ({error, ...props}) => {
  return (
    <div>
        <Input {...props}/>
        {<InvalidMessage>{error}</InvalidMessage>
          //TODO перебор массива ошибок error и если одна из них содержит строку, то выводит ее
           /*  errors.map(error => 
              error
              ?<InvalidMessage>{error}</InvalidMessage>
              :null
            ) */
        }
    </div>
  )
}

export default ValidatedInput
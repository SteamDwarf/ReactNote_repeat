import React from 'react'
import Input from './Input'
import InvalidMessage from './InvalidMessage'

const ValidatedInput = ({error, ...props}) => {
  return (
    <div>
        <Input {...props}/>
        {
            error
            ?<InvalidMessage>{error}</InvalidMessage>
            :null
        }
    </div>
  )
}

export default ValidatedInput
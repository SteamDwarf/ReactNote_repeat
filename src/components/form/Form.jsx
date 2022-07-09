import React from 'react'
import './Form.scss';
import Button from '../../UI/Button';
import InvalidMessage from '../../UI/InvalidMessage';

const Form = ({title, submit, btnName, error, children}) => {
  return (
    <form className='form'>
        <h3 className='title'>{title}</h3>
        {children}
        <div className='btns-block'>
            <Button color='blue' onClick={submit}>{btnName}</Button>
        </div>
        {
            error
            ?<InvalidMessage>{error}</InvalidMessage>
            :null
        }
    </form>
  )
}

export default Form
import React from 'react'
import Form from '../components/Form'
import Input from '../UI/Input'
import MyLink from '../UI/MyLink';
import './Registration.scss';

const Registration = () => {
  return (
    <div className='registration_block'>
        <Form
            title='Введите ваши данные:'
            submit={() => console.log('registration')}
            btnName='Зарегистрироваться'
            error=''
        >
            <Input 
                /* onChange={enterUsername}
                value={newUser.username}  */
                placeholder='Логин'
            />
            <Input 
                /* onChange={enterUsername}
                value={newUser.username}  */
                placeholder='Электронная почта'
            />
            <Input 
                /* onChange={enterPassword}
                value={newUser.password}  */
                type='password' 
                placeholder='Пароль'
            />
            <Input 
                /* onChange={enterPassword}
                value={newUser.password}  */
                type='password' 
                placeholder='Повторите пароль'
            />
            <div>
                Зарегистрированы?
                <MyLink to='/login'> Атворизоваться</MyLink>
            </div>
        </Form>
    </div>
  )
}

export default Registration
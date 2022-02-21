import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Form from '../components/Form'
import { findExistingUser } from '../redux/reducers/AuthReducer';
import Input from '../UI/Input'
import MyLink from '../UI/MyLink';
import ValidatedInput from '../UI/ValidatedInput';
import './Registration.scss';

const Registration = () => {
    const dispatch = useDispatch();
    const {authError, existingUser} = useSelector(state => state.auth);
    const [newUser, setNewUser] = useState({username: '', email: '', password: ''});
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [registerError, setRegisterError] = useState({username: '', email: '', password: ''});

    function validateRepeatedPassword() {
        if(newUser.password !== repeatedPassword) {
           setRegisterError({...registerError, password: 'Пароли не совпадают'})
        } else {
            setRegisterError({...registerError, password: ''});
        }
    }
    function validateUsername() {
        if(newUser.username.length < 3) {
            setRegisterError({...registerError, username: 'Имя пользователя слишком короткое'});
            return;
        } else {
            setRegisterError({...registerError, username: ''});
        }

        dispatch(findExistingUser('username', newUser.username));

        //TODO Проверяет на совпадение пользователя раньше чем его получили
/* 
        if(existingUser.length > 0) {
            setRegisterError({...registerError, username: 'Пользователь с таким логином уже есть'});
        } else {
            setRegisterError({...registerError, username: ''});
        } */
    }

    function registerUser(e) {
        e.preventDefault();
        console.log(newUser, repeatedPassword)
    }

/*     useEffect(() => {
        dispatch(findExistingUser('username', 'Bret'));
    }, []); */

    return (
        <div className='registration_block'>
            <Form
                title='Введите ваши данные:'
                submit={registerUser}
                btnName='Зарегистрироваться'
                error={authError}
            >
                <ValidatedInput 
                    onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                    value={newUser.username} 
                    placeholder='Логин'
                    error={registerError.username}
                    onBlur={validateUsername}
                />
                <Input 
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    value={newUser.email} 
                    placeholder='Электронная почта'
                />
                <Input 
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                    value={newUser.password} 
                    type='password' 
                    placeholder='Пароль'
                />
                <ValidatedInput
                    onChange={(e) => setRepeatedPassword(e.target.value)}
                    value={repeatedPassword} 
                    type='password' 
                    placeholder='Повторите пароль'
                    onBlur={validateRepeatedPassword}
                    error={registerError.password}
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
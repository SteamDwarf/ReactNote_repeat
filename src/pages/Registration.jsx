import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form'
import { findExistingUser, setPasswordErrorAction, setUsernameErrorAction, setEmailErrorAction, registerNewUser, setAuthErrorAction } from '../redux/reducers/AuthReducer';
import Input from '../UI/Input'
import MyLink from '../UI/MyLink';
import ValidatedInput from '../UI/ValidatedInput';
import './Registration.scss';

const Registration = () => {
    const emailReg = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/gi;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {authError, registerError} = useSelector(state => state.auth);
    const [newUser, setNewUser] = useState({username: '', email: '', password: ''});
    const [repeatedPassword, setRepeatedPassword] = useState('');

    function validateRepeatedPassword() {
        if(newUser.password !== repeatedPassword) {
           dispatch(setPasswordErrorAction('Пароли не совпадают'));
        } else {
            dispatch(setPasswordErrorAction(''));
        }
    }
    function validateUsername() {
        if(newUser.username.length < 3) {
            dispatch(setUsernameErrorAction('Имя пользователя слишком короткое. '));
            return;
        } else {
            dispatch(setUsernameErrorAction(''));
        }

        dispatch(findExistingUser('username', newUser.username));
    }
    function validateEmail() {
        if(!emailReg.test(newUser.email)) {
            dispatch(setEmailErrorAction('Некорректно введена электронная почта. '));
            return;
        }else {
            dispatch(setEmailErrorAction(''));
        }

        dispatch(findExistingUser('email', newUser.email));
    }

    function registerUser(e) {
        e.preventDefault();

        validateUsername();
        validateEmail();
        validateRepeatedPassword();

        if(registerError.username || registerError.email || registerError.password) {
            dispatch(setAuthErrorAction('Вы ввели некорректные данные.'));
            return;
        }
        
        dispatch(registerNewUser(newUser));
        dispatch(setAuthErrorAction(''));
        navigate('/');
    }

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
                <ValidatedInput 
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    value={newUser.email} 
                    placeholder='Электронная почта'
                    error={registerError.email}
                    onBlur={validateEmail}
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
                    <MyLink to='/login'> Авторизоваться</MyLink>
                </div>
            </Form>
        </div>
    )
}

export default Registration
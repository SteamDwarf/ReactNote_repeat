import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import MyButton from '../UI/MyButton'
import MyInput from '../UI/MyInput'

function Login() {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    
    function signIn(e) {
        e.preventDefault();
        setIsAuth(true);
    }

    return (
        <form className='App login-form'>
            <h3 className='title'>Введите логин и пароль пользователя:</h3>
            <MyInput placeholder='Логин'/>
            <MyInput type='password' placeholder='Пароль'/>
            <MyButton onClick={signIn}>Войти</MyButton>
        </form>
    )
}

export default Login

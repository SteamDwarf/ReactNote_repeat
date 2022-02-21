import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAllUsers, getUserByFilter, postNewUser } from '../API/UserService';
import { AuthContext } from '../context/AuthContext'
import { useFetching } from '../hooks/useFetching';
import { useFilterUsers, useUsers } from '../hooks/useUsers';
import { enterPasswordAction, enterUsernameAction, setAuthErrorAction, setCurrentUserAction, signInAction } from '../redux/reducers/AuthReducer';
import { setUserDataValidStateAction } from '../redux/reducers/UIReducer';
import ErrorMessage from '../UI/ErrorMessage';
import InvalidMessage from '../UI/InvalidMessage';
import Button from '../UI/Button'
import Input from '../UI/Input';
import './Login.scss';
import MyLink from '../UI/MyLink';
import { Link, useNavigate } from 'react-router-dom';
import Form from '../components/Form';

function Login() {
    const dispatch = useDispatch();
    const {newUser, authError} = useSelector(state => state.auth);
    const isValidForm = useSelector(state => state.ui.isValidUserData);
    const navigate = useNavigate();

    const [fetchUser, isFetching, fetchError] = useFetching(async (username, password) => {
        const user = await getUserByFilter(username, password);
        const newId = Date.now();
        if(user.data.length) {
            dispatch(setCurrentUserAction(user.data[0]));
            localStorage.setItem('userId', user.data[0].id);
        } else {
            await postNewUser({...newUser, id: newId});
            dispatch(setCurrentUserAction({...newUser, id: newId}));
            localStorage.setItem('userId', newId);
        }
    });

    async function signIn(e) {
        e.preventDefault();

        if(!newUser.username || !newUser.password) {
            dispatch(setAuthErrorAction('Введите логин и пароль!'));
            return;
        }

        await fetchUser(newUser.username, newUser.password);
        dispatch(signInAction());
        navigate('/');
    }
    function enterUsername(e) {
        dispatch(enterUsernameAction(e.target.value));
    }
    function enterPassword(e) {
        dispatch(enterPasswordAction(e.target.value));
    }

    return (
        <div className='login_block'>
            <Form 
                title='Введите логин и пароль пользователя:'
                submit={signIn}
                btnName='Войти'
                error={authError}
            >
                <Input 
                    onChange={enterUsername}
                    value={newUser.username} 
                    placeholder='Логин'
                />
                <Input 
                    onChange={enterPassword}
                    value={newUser.password} 
                    type='password' 
                    placeholder='Пароль'
                />
                <div>
                    Не зарегистрированы?
                    <MyLink to='/registration'> Зарегистрироваться</MyLink>
                </div>
            </Form>
        </div>
    )
}

export default Login

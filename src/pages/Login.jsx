import React, { useContext, useEffect, useState } from 'react'
import { getAllUsers, getUserByFilter, postNewUser } from '../API/UserService';
import { AuthContext } from '../context/AuthContext'
import { useFetching } from '../hooks/useFetching';
import { useFilterUsers, useUsers } from '../hooks/useUsers';
import ErrorMessage from '../UI/ErrorMessage';
import InvalidMessage from '../UI/InvalidMessage';
import MyButton from '../UI/MyButton'
import MyInput from '../UI/MyInput'

function Login() {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const {currentUser, setCurrentUser} = useContext(AuthContext);
    const [newUser, setNewUser] = useState({username:'', password:'', id: ''});
    const [isValidForm, setIsValidForm] = useState(true);

    const [fetchUser, isFetching, fetchError] = useFetching(async (username, password) => {
        const user = await getUserByFilter(username, password);
        const newId = Date.now();
        if(user.data.length) {
            setCurrentUser(user.data[0]);
            localStorage.setItem('userId', user.data[0].id);
        } else {
            await postNewUser({...newUser, id: newId});
            setCurrentUser({...newUser, id: newId});
            localStorage.setItem('userId', newId);
        }
    });

    async function signIn(e) {
        e.preventDefault();

        if(!newUser.username || !newUser.password) {
            setIsValidForm(false);
            return;
        }

        await fetchUser(newUser.username, newUser.password);
        console.log(localStorage);
        setIsAuth(true); 
    }
    function enterUsername(e) {
        setNewUser({...newUser, username: e.target.value});
    }
    function enterPassword(e) {
        setNewUser({...newUser, password: e.target.value});
    }

    return (
        <form className='App login-form '>
            <h3 className='title'>Введите логин и пароль пользователя:</h3>
            <MyInput 
                onChange={enterUsername}
                value={newUser.username} 
                placeholder='Логин'
            />
            <MyInput 
                onChange={enterPassword}
                value={newUser.password} 
                type='password' 
                placeholder='Пароль'
            />
            <div className='btns-block'>
                <MyButton color='blue' onClick={signIn}>Войти</MyButton>
            </div>
            {
                !isValidForm
                ?<InvalidMessage>Введите логин и пароль!</InvalidMessage>
                :null
            }
        </form>
    )
}

export default Login

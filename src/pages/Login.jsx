import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAllUsers, getUserByFilter, postNewUser } from '../API/UserService';
import { AuthContext } from '../context/AuthContext'
import { useFetching } from '../hooks/useFetching';
import { useFilterUsers, useUsers } from '../hooks/useUsers';
import { enterPasswordAction, enterUsernameAction, setCurrentUserAction, signInAction } from '../redux/reducers/AuthReducer';
import { setUserDataValidStateAction } from '../redux/reducers/UIReducer';
import ErrorMessage from '../UI/ErrorMessage';
import InvalidMessage from '../UI/InvalidMessage';
import Button from '../UI/Button'
import Input from '../UI/Input';

function Login() {
    const dispatch = useDispatch();
    const newUser = useSelector(state => state.auth.newUser);
    const isValidForm = useSelector(state => state.ui.isValidUserData);
    //const [isValidForm, setIsValidForm] = useState(true);

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
            //setIsValidForm(false);
            dispatch(setUserDataValidStateAction(false));
            return;
        }

        await fetchUser(newUser.username, newUser.password);
        dispatch(signInAction());
    }
    function enterUsername(e) {
        dispatch(enterUsernameAction(e.target.value));
    }
    function enterPassword(e) {
        dispatch(enterPasswordAction(e.target.value));
    }

    return (
        <div>
            <form className='login-form'>
                <h3 className='title'>Введите логин и пароль пользователя:</h3>
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
                <div className='btns-block'>
                    <Button color='blue' onClick={signIn}>Войти</Button>
                </div>
                {
                    !isValidForm
                    ?<InvalidMessage>Введите логин и пароль!</InvalidMessage>
                    :null
                }
            </form>
        </div>
    )
}

export default Login

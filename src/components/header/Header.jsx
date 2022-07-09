import React, {useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../UI/Button'
import './Header.scss'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { setCurrentUserAction, signOutAction } from '../../redux/reducers/AuthReducer'
import { setThemeAction } from '../../redux/reducers/UIReducer';
import ProfileLink from '../../UI/ProfileLink'

function Header() {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.isAuth);
    const currentUser = useSelector(state => state.auth.currentUser);
    const {theme} = useSelector(state => state.ui);
    const navigate = useNavigate();

    function signOut() {
        dispatch(setCurrentUserAction({}));
        navigate('/');
        localStorage.removeItem('userId');
        dispatch(signOutAction());
    }
    function signIn() {
        navigate('/login');
    }

    function setTheme() {
        if(theme === 'light') {
            dispatch(setThemeAction('dark'));
        } else {
            dispatch(setThemeAction('light'));
        }
    }
    
    return (
        <div className='header'>
            <div>
                <Link to='/'>
                    <Button color='green'>Посты</Button>
                </Link>
            </div>
            <div className='user-block'>
                { isAuth ? <ProfileLink to='/profile'>{currentUser.username}</ProfileLink> : null }
                <Button onClick={setTheme} color='green'>Смена темы</Button>
                {isAuth 
                    ? <Button color='green' onClick={signOut}>Выйти</Button>
                    : <Button color='green' onClick={signIn}>Войти</Button>
                }
                
            </div>
        </div>
    )
}

export default Header

import React, {useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../UI/Button'
import './Header.scss'
import { AuthContext } from '../context/AuthContext'
import MyLink from '../UI/MyLink'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { setCurrentUserAction, signOutAction } from '../redux/reducers/AuthReducer'
import { setThemeAction } from '../redux/reducers/UIReducer';

function Header() {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.isAuth);
    const currentUser = useSelector(state => state.auth.currentUser);
    const {theme} = useSelector(state => state.ui);
    const navigate = useNavigate();
    console.log(isAuth);

    function signOut() {
        dispatch(setCurrentUserAction({}));
        navigate('/');
        localStorage.removeItem('userId');
        dispatch(signOutAction());
    }

    function setTheme() {
        if(theme === 'light') {
            dispatch(setThemeAction('dark'));
        } else {
            dispatch(setThemeAction('light'));
        }
    }
/*     function setLightTheme() {
        dispatch(setLightThemeAction());
    }
    function setDarkTheme() {
        dispatch(setDarkThemeAction());
    } */
    return (
        isAuth
            ?
                <div className={`header`}>
                    <div>
                        <Link to='/'>
                            <Button color='green'>Посты</Button>
                        </Link>
                    </div>
                    <div className={`user-block`}>
                        <MyLink to='/profile'>{currentUser.username}</MyLink>
                        <Button onClick={setTheme} color='green'>Смена темы</Button>
                        <Button color='green' onClick={signOut}>Выйти</Button>
                    </div>
                </div>
            :
                null
    )
}

export default Header

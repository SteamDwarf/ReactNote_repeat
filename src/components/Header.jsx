import React, {useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MyButton from '../UI/MyButton'
import classes from './Header.module.css'
import { AuthContext } from '../context/AuthContext'
import MyLink from '../UI/MyLink'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { setCurrentUserAction, signOutAction } from '../redux/AuthReducer'

function Header() {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.isAuth);
    const currentUser = useSelector(state => state.auth.currentUser);
    const navigate = useNavigate();
    console.log(isAuth);

    function signOut() {
        dispatch(setCurrentUserAction({}));
        navigate('/');
        localStorage.removeItem('userId');
        dispatch(signOutAction());
    }
    return (
        isAuth
            ?
                <div className={`${classes.header} App`}>
                    <div>
                        <Link to='/'>
                            <MyButton color='green'>Посты</MyButton>
                        </Link>
                    </div>
                    <div className={classes.userBlock}>
                        <MyLink to='/profile'>{currentUser.username}</MyLink>
                        <MyButton color='green' onClick={signOut}>Выйти</MyButton>
                    </div>
                </div>
            :
                null
    )
}

export default Header

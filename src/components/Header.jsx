import React, {useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MyButton from '../UI/MyButton'
import classes from './Header.module.css'
import { AuthContext } from '../context/AuthContext'
import MyLink from '../UI/MyLink'

function Header() {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const {currentUser, setCurrentUser} = useContext(AuthContext);
    const navigate = useNavigate();
    
    function signOut() {
        setCurrentUser({});
        navigate('/');
        localStorage.removeItem('userId');
        setIsAuth(false);
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

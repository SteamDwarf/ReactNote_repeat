import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import MyButton from '../UI/MyButton'
import classes from './Header.module.css'
import { AuthContext } from '../context/AuthContext'

function Header() {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    
    function signOut() {
        setIsAuth(false);
    }
    return (
        isAuth
            ?
                <div className={`${classes.header} App`}>
                    <div>
                        <Link to='/'>
                            <MyButton>Посты</MyButton>
                        </Link>
                    </div>
                    <div className={classes.userBlock}>
                        <Link to='/users'>
                            <MyButton>Пользователи</MyButton>
                        </Link>
                        <MyButton onClick={signOut}>Выйти</MyButton>
                    </div>
                </div>
            :
                null
    )
}

export default Header

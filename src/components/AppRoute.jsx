import React, { useContext } from 'react'
import { Routes, Route } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import Login from '../pages/Login';
import PostDetails from '../pages/PostDetails';
import UserInformation from '../pages/UserInformation';
import Posts from '../pages/Posts';
import Header from './Header';

function AppRoute() {
    const {isAuth} = useContext(AuthContext);

    return (
        isAuth
        ?
            <Routes>
                <Route path='/' element={<Posts />} />
                <Route path='/posts/:postId' element={<PostDetails />}/>
                <Route path='/users/:userId' element={<UserInformation />}/>
            </Routes>
        :
            <Routes>
                <Route path='/' element={<Login />}/>
            </Routes>
    )
}

export default AppRoute

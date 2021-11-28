import React, { useContext } from 'react'
import { Routes, Route, useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import Login from '../pages/Login';
import PostDetails from '../pages/PostDetails';
import Posts from '../pages/Posts';
import Profile from '../pages/Profile';

function AppRoute() {
    const {isAuth} = useContext(AuthContext);

    return (
        isAuth
        ?
            <Routes>
                <Route index element={<Posts />} />
                <Route exact path='/posts/:postId' element={<PostDetails />}/>
                <Route exact path='/profile' element={<Profile />}/>
            </Routes>
        :
            <Routes>
                <Route index element={<Login />}/>
            </Routes>
    )
}

export default AppRoute

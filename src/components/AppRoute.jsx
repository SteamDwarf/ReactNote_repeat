import React, { useContext } from 'react'
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate, useRoutes } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import Login from '../pages/Login';
import PostDetails from '../pages/PostDetails';
import Posts from '../pages/Posts';
import Profile from '../pages/Profile';
import Registration from '../pages/Registration';

function AppRoute() {
    const isAuth = useSelector(state => state.auth.isAuth);
    const mainRoutes = [
        {path: '/', element: <Posts/>},
        {path: '/posts/:postId', element: <PostDetails/>}
    ];
    const RoutesForAuthorized = () => useRoutes([
        ...mainRoutes,
        {path: '/profile', element: <Profile/>}
    ]);
    const RoutesNotForAuthorized = () => useRoutes([
        ...mainRoutes,
        {path: '/login', element: <Login/>},
        {path: '/registration', element: <Registration/>}
    ]);

    return (
        isAuth
        ?<RoutesForAuthorized /> 
        :<RoutesNotForAuthorized />
    )
}

export default AppRoute

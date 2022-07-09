import React from 'react'
import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router';
import Login from '../Login/Login';
import PostDetails from '../post-details/PostDetails';
import Posts from '../posts/Posts';
import Profile from '../profile/Profile';
import Registration from '../registration/Registration';

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

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useContext } from 'react/cjs/react.development'
import { getUserPosts } from '../API/PostService';
import { AuthContext } from '../context/AuthContext'
import { useFetching } from '../hooks/useFetching';
import PostList from '../components/PostList';
import { deletePostById } from '../API/PostService';
import { usePosts } from '../hooks/usePosts';
import { PostsConfContext } from '../context/PostsConfContext';

function Profile() {
    const {currentUser} = useContext(AuthContext);
    const {curSortOption} = useContext(PostsConfContext);
    const [userPosts, setUserPosts] = useState([]);
    const searchedAndSortedPosts = usePosts(userPosts, curSortOption, '', userPosts.length);
    const [fetchUserPosts, isLoading, error] = useFetching(async () => {
        const response = await getUserPosts(currentUser.id);
        setUserPosts(response.data);
    });
    const [deletePost, postIsDeleting, deletingError] = useFetching(async (id) => {
        const response = await deletePostById(id);
        setUserPosts(userPosts.filter(userPosts => userPosts.id !== id));
    });

    useEffect(fetchUserPosts, []);

    return (
        <div className='App'>
            <h2 className='title'>{`Профиль пользователя ${currentUser.username}`}</h2>
            <PostList 
                title='Ваши посты' 
                posts={searchedAndSortedPosts[0]}
                removePost={deletePost}
                isLoading={isLoading}
                error={error}
            />
        </div>
    )
}

export default Profile

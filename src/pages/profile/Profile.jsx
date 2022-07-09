import React, { useEffect, useState } from 'react'
import { getUserPosts, deletePostById } from '../../API/PostService';
import { useFetching } from '../../hooks/useFetching';
import PostList from '../../components/post-list/PostList';
import { usePosts } from '../../hooks/usePosts';
import { useSelector } from 'react-redux';

function Profile() {
    const currentUser = useSelector(state => state.auth.currentUser);
    const curSortOption = useSelector(state => state.posts.curSortOption);

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

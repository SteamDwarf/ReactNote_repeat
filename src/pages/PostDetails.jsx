import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';
import { getPostDetailsById } from '../API/PostService';
import { useFetching } from '../hooks/useFetching';
import ErrorMessage from '../UI/ErrorMessage';
import Loader from '../UI/Loader';
import '../style.css';
import PostItemDetails from '../UI/PostItemDetails';

function PostDetails() {
    const [postDetails, setPostDetails] = useState({});
    const [postComments, setPostComments] = useState([]);
    const urlParams = useParams();
    const [fetchPostDetails, isLoading, error] = useFetching(async () => {
        const [post, comments] = await getPostDetailsById(urlParams.postId);

        setPostDetails(post.data);
        setPostComments(comments.data);
    });

    useEffect(fetchPostDetails, []);

    if(error) {
        return <ErrorMessage error={error}/>
    }
    if(isLoading) {
        return <Loader text='Информация о посте загружается. Подождите...' />
    }
    return (
        <div className='App'>
            <PostItemDetails postDetails={postDetails} postComments={postComments}/>
        </div>
    )
}

export default PostDetails

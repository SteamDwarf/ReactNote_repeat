import React, {useEffect} from 'react'
import { useParams } from 'react-router'
import ErrorMessage from '../../UI/ErrorMessage';
import Loader from '../../UI/Loader';
import '../../style.css'
import PostItemDetails from '../../UI/PostItemDetails';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrowsePostInformation } from '../../redux/reducers/BrowsePostReducer';

function PostDetails() {
    const {browsePost, isFetchingPost, fetchPostError} = useSelector(state => state.postDetails);
    const {postComments, isFetchingComments, fetchCommentsError} = useSelector(state => state.postDetails);
    const urlParams = useParams();
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchBrowsePostInformation(urlParams.postId));
    }, []);

    if(fetchCommentsError | fetchPostError) {
        return (
            <>
                <ErrorMessage error={fetchPostError}/>
                <ErrorMessage error={fetchCommentsError}/>
            </>
        )
    }
    if(isFetchingPost | isFetchingComments) {
        return (
            <>
                <Loader text='Информация о посте загружается. Подождите...' />
            </>
        )
    }
    return (
        <div className='App'>
            <PostItemDetails postDetails={browsePost} postComments={postComments}/>
        </div>
    )
}

export default PostDetails

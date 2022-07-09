import React from 'react'
import './PostItemDetails.scss';
import '../styles/themes/components/post-item-details.scss';
import { useSelector } from 'react-redux';
import CommentForm from '../components/comment-form/CommentForm';

function PostItemDetails({postDetails, postComments}) {
    const {theme} = useSelector(state => state.ui);

    return (
        <div className={`post_item-detail_block ${theme}`}>
            <h1 className='title'>{postDetails.title}</h1>
            <div>{postDetails.body}</div>
            <div className={`comments_block`}>
                <h3 className='comments_title'>{`Комментарии ${postComments.length}`}</h3>
                <hr />
                {postComments.map((comment) =>
                    <div className='comment' key={comment.id}>
                        <h5 className='comment_email'>{comment.email}</h5>
                        <div>{comment.body}</div>
                    </div>
                )}
                {postComments.length > 0
                    ?
                        <hr />
                    :
                        null
                }

                <CommentForm />
            </div>
        </div>
    )
}

export default PostItemDetails

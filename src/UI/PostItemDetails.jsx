import React from 'react'
import './PostItemDetails.scss';
import '../styles/themes/components/post-item-details.scss';
import { useSelector } from 'react-redux';

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
                        <h5>{comment.email}</h5>
                        <div>{comment.body}</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PostItemDetails

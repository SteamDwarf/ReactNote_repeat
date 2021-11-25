import React from 'react'
import classes from './PostItemDetails.module.css';

function PostItemDetails({postDetails, postComments}) {
    return (
        <div className={classes.block}>
            <h1 className='title'>{postDetails.title}</h1>
            <div>{postDetails.body}</div>
            <div className={classes.commentsBlock}>
                <h3 className={classes.commentsTitle}>{`Комментарии ${postComments.length}`}</h3>
                <hr />
                {postComments.map((comment) =>
                    <div className={classes.comment} key={comment.id}>
                        <h5>{comment.email}</h5>
                        <div>{comment.body}</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PostItemDetails

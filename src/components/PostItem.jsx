import React from "react";
import MyButton from "../UI/MyButton";
import classes from './PostItem.module.css'

function PostItem({index, post, removePost}) {
    return (
        <div className={classes.post}>
            <div className={classes.information}>
                <h3>{`${post.title}`}</h3>
                <div className="description">{post.body}</div>
            </div>
            <div className={classes.btnsBlock}>
                <MyButton >Открыть</MyButton>
                <MyButton onClick={() => removePost(post)}>Удалить</MyButton>
            </div>
        </div>
    );
}

export default PostItem;
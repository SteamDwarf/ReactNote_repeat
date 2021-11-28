import React from "react";
import { Link } from "react-router-dom";
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
                <Link to={`/posts/${post.id}`}>
                    <MyButton color='blue'>Открыть</MyButton>
                </Link>
                {
                    removePost
                    ?<MyButton color='blue' onClick={() => removePost(post.id)}>Удалить</MyButton>
                    :null
                }
                
            </div>
        </div>
    );
}

export default PostItem;
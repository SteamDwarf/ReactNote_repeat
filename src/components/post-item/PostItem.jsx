import React from "react";
import { Link } from "react-router-dom";
import Button from "../../UI/Button";
import './PostItem.scss';
import '../../styles/themes/components/post.scss';
import { useSelector } from "react-redux";

function PostItem({index, post, removePost}) {
    const {theme} = useSelector(state => state.ui);

    return (
        <div className={`post ${theme}`}>
            <div className="post_main-block">
                <div className={`information`}>
                    <h3>{`${post.title}`}</h3>
                    <div className="description">{post.body}</div>
                </div>
                <div className={`btns-block`}>
                    <Link to={`/posts/${post.id}`}>
                        <Button color='blue'>Открыть</Button>
                    </Link>
                    {
                        removePost
                        ?<Button color='blue' onClick={() => removePost(post.id)}>Удалить</Button>
                        :null
                    }
                </div>
            </div>
            {
                post.date
                ?
                    <div className="post_additional-block">
                        <hr/>
                        <div className="date-block">Опубликован: {post.date}</div>
                    </div>
                :
                    null
            }
            
        </div>
    );
}

export default PostItem;
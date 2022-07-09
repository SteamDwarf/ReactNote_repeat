import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Loader from "../../UI/Loader";
import PostItem from "../post-item/PostItem";
import './PostList.scss';
import ErrorMessage from "../../UI/ErrorMessage";

function PostList({title, posts, removePost, isLoading, error}) {
    if(error) {
        return <ErrorMessage error={error}/>
    }
    if(isLoading) {
        return <Loader text={'Посты загружаются. Ожидайте...'}/>
    }

    if(!posts?.length) {
        return <h1 className='title'>Посты не найдены!</h1>;
    }

    return (
        <div className={`post-list`}>
            <h1 className={`title`}>{title}</h1>

            <TransitionGroup>
                {posts.map((post, i) =>  
                    <CSSTransition key={post.id} timeout={500} classNames="post">
                        <PostItem 
                            removePost={removePost}
                            index={i}
                            post={post}
                        />
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
}

export default PostList;
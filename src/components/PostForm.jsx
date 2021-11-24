import React, {useState} from 'react'
import MyButton from '../UI/MyButton'
import MyInput from '../UI/MyInput'
import classes from './PostForm.module.css'

function PostForm({addPost, closeModal}) {
    const [post, setPost] = useState({title: '', body: ''});

    function createPost() {
        addPost({...post, id: Date.now()});
        setPost({title: '', body: ''});

        if(closeModal) {
            closeModal();
        }
    }

    return (
        <div className={classes.form}>
            <MyInput 
                value={post.title}
                onChange={(e) => setPost({...post, title: e.target.value})} 
                placeholder='Заголовок поста'
            />
            <MyInput 
                value={post.body}
                onChange={(e) => setPost({...post, body: e.target.value})}
                placeholder='Описание поста'
            />
            <MyButton onClick={createPost}>Добавить пост</MyButton>
        </div>
    )
}

export default PostForm

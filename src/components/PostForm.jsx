import React, {useState} from 'react'
import { useContext } from 'react/cjs/react.development';
import { AuthContext } from '../context/AuthContext';
import MyButton from '../UI/MyButton'
import MyInput from '../UI/MyInput'
import MyTextArea from '../UI/MyTextarea';
import classes from './PostForm.module.css'

function PostForm({addPost}) {
    const {currentUser} = useContext(AuthContext);
    const [post, setPost] = useState({title: '', body: ''});

    function createPost() {
        addPost({...post, id: Date.now(), userId: currentUser.id});
        setPost({title: '', body: ''});
    }

    return (
        <div className={classes.form}>
            <MyInput 
                value={post.title}
                onChange={(e) => setPost({...post, title: e.target.value})} 
                placeholder='Заголовок поста'
            />
            <MyTextArea 
                value={post.body}
                onChange={(e) => setPost({...post, body: e.target.value})}
                placeholder='Описание поста'
            />
            <MyButton color='blue' onClick={createPost}>Добавить пост</MyButton>
        </div>
    )
}

export default PostForm

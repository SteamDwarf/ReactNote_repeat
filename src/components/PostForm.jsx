import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import { useContext } from 'react/cjs/react.development';
import { AuthContext } from '../context/AuthContext';
import Button from '../UI/Button'
import Input from '../UI/Input'
import Textarea from '../UI/Textarea';
import './PostForm.scss'
import '../styles/themes/components/form.scss';

function PostForm({addPost}) {
    const currentUser = useSelector(state => state.auth.currentUser);
    const {theme} = useSelector(state => state.ui);
    const [post, setPost] = useState({title: '', body: ''});

    function createPost() {
        const date = new Date().toLocaleString().slice(0, -3).replace(',', '');
        addPost({...post, id: Date.now(), userId: currentUser.id, date});
        setPost({title: '', body: ''});
    }

    return (
        <div className={`post-form ${theme}`}>
            <Input 
                value={post.title}
                onChange={(e) => setPost({...post, title: e.target.value})} 
                placeholder='Заголовок поста'
            />
            <Textarea 
                value={post.body}
                onChange={(e) => setPost({...post, body: e.target.value})}
                placeholder='Описание поста'
            />
            <Button color='blue' onClick={createPost}>Добавить пост</Button>
        </div>
    )
}

export default PostForm

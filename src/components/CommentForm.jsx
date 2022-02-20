import React, { useState } from 'react'
import Textarea from '../UI/Textarea';
import Button from '../UI/Button';
import './CommentForm.scss';
import { useDispatch, useSelector } from 'react-redux';
import { uploadComment } from '../redux/reducers/BrowsePostReducer';
import { useParams } from 'react-router-dom';

const CommentForm = () => {
  const dispatch = useDispatch();
  const urlParams = useParams();
  const {currentUser} = useSelector(state => state.auth);
  const [comment, setComment] = useState({postId: urlParams.postId, id: '', email: currentUser.username, body: ''});

  function writeComment(text) {
    setComment({...comment, body: text});
  }
  function sendComment() {
    dispatch(uploadComment(urlParams.postId, comment));
    setComment({...comment, body: ''});
  }

  return (
    <div className='comment-form'>
        <Textarea placeholder='Оставьте комментарий' onChange={(e) => writeComment(e.target.value)} value={comment.body}/>
        <Button onClick={sendComment}>Отправить</Button>
    </div>
  )
}

export default CommentForm
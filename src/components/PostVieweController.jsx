import React, {useState} from 'react'
import MyButton from '../UI/MyButton';
import MyInput from '../UI/MyInput';
import MySelect from '../UI/MySelect';
import classes from './PostVieweController.module.css';

function PostVieweController({curSortOption, changeSortOption, searchQuerry, changeSearchQuerry, toggleModal}) {
    const [sortOptions, setSortOptions] = useState([
        {value: 'title', text: 'заголовку'},
        {value: 'body', text: 'описанию'},
    ]);
    return (
        <div className={classes.vieweController}>
            <MySelect 
                name='sorting'
                options={sortOptions}
                defaultOption='Сортировать по:'
                value={curSortOption}
                onChange={changeSortOption}
            />
            <MyButton onClick={toggleModal}>Добавить пост</MyButton>
            <MyInput 
                placeholder='Поиск'
                value={searchQuerry}
                onChange={(e) => changeSearchQuerry(e.target.value)}
            />
        </div>
    )
}

export default PostVieweController

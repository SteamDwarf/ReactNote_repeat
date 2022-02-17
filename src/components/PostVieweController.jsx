import React, {useState} from 'react'
import Button from '../UI/Button';
import Input from '../UI/Input';
import Select from '../UI/Select';
import './PostVieweController.scss';

function PostVieweController({curSortOption, changeSortOption, searchQuerry, changeSearchQuerry, toggleModal}) {
    const [sortOptions, setSortOptions] = useState([
        {value: 'title', text: 'заголовку'},
        {value: 'body', text: 'описанию'},
    ]);
    return (
        <div className={`viewe-controller`}>
            <Select 
                name='sorting'
                options={sortOptions}
                defaultOption='Сортировать по:'
                value={curSortOption}
                onChange={changeSortOption}
            />
            <Button color='blue' onClick={toggleModal}>Добавить пост</Button>
            <Input 
                placeholder='Поиск'
                value={searchQuerry}
                onChange={(e) => changeSearchQuerry(e.target.value)}
            />
        </div>
    )
}

export default PostVieweController

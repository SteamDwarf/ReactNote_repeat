import React from 'react'
import MySelect from '../UI/MySelect'
import PageBtn from '../UI/PageBtn'
import { countPages } from '../utils/pages'
import classes from './Pangination.module.css'

function Pangination({pages, currentPage, changePage, currentLimit, changeLimit}) {
    const postsLimits = [
        {value: '-1', text: 'все'},
        {value: '10', text: '10'},
        {value: '25', text: '25'},
        {value: '50', text: '50'},
    ]
    return (
        <div className={classes.container}>
            <div>
                {countPages(pages).map((p) => 
                    <PageBtn 
                        onClick={() => changePage(p)} 
                        key={p} 
                        isActive={ currentPage === p ? true : false}
                    >
                        {p}
                    </PageBtn>
                )}
            </div>
            <MySelect 
                name={'limit'}
                options={postsLimits}
                defaultOption={"Количество постов на странице"}
                value={currentLimit}
                onChange={changeLimit}
            />
        </div>
    )
}

export default Pangination

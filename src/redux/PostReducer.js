const defaultState = {
    curSortOption: 'title',
    postsLimit: '10',
    page: 1,
    searchQuerry: ''
}

/* const SET_SORT_BY_TITLE = 'SET_SORT_BY_TITLE';
const SET_SORT_BY_DESCRIPTION = 'SET_SORT_BY_DESCRIPTION'; */
const SET_SORT_OPTION = 'SET_SORT_OPTION';
const SET_POSTS_LIMIT = 'SET_POSTS_LIMIT';
const TURN_OVER_PAGE = 'TURN_OVER_PAGE';
const SET_SEARCH_QUERRY = 'SET_SEARCH_QUERRY';

export function postReducer(state = defaultState, action) {
    switch(action.type) {
       /*  case SET_SORT_BY_TITLE:
            return {...state, curSortOption: 'title'}; */
        case SET_SORT_OPTION:
            return {...state, curSortOption: action.payload};
        case SET_POSTS_LIMIT:
            return {...state, postsLimit: action.payload};
        case TURN_OVER_PAGE:
            return {...state, page: action.payload}; 
        case SET_SEARCH_QUERRY:
            return {...state, searchQuerry: action.payload};
        default: return state;
    }
}

export const setSortOptionAction = (payload) => ({type: SET_SORT_OPTION, payload});
export const setPostsLimitAction = (payload) => ({type: SET_POSTS_LIMIT, payload});
export const turnOverPageAction = (payload) => ({type: TURN_OVER_PAGE, payload});
export const setSearchQuerryAction = (payload) => ({type: SET_SEARCH_QUERRY, payload});
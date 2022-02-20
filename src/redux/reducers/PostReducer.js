const defaultState = {
    posts: [],
    error: '',
    isFetching: false,
    uploadError: '',
    isUploading: false,
    curSortOption: 'title',
    postsLimit: '10',
    page: 1,
    searchQuerry: ''
}

const SET_SORT_OPTION = 'SET_SORT_OPTION';
const SET_POSTS_LIMIT = 'SET_POSTS_LIMIT';
const TURN_OVER_PAGE = 'TURN_OVER_PAGE';
const SET_SEARCH_QUERRY = 'SET_SEARCH_QUERRY';

const FETCHING_POSTS = 'FETCHING_POSTS';
const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
const FETCH_POSTS_ERRORR = 'FETCH_POSTS_ERRORR';

const UPLOADING_POST = 'UPLOADING_POST';
const UPLOAD_POST_SUCCESS = 'UPLOAD_POST_SUCCESS';
const UPLOAD_POST_ERROR = 'UPLOAD_POST_ERROR';
const CLEAR_UPLOAD_ERROR = 'CLEAR_UPLOAD_ERROR';


const fetchingPostsAction = () => ({type: FETCHING_POSTS});
const fetchPostsSuccessAction = (posts) => ({type: FETCH_POSTS_SUCCESS, payload: posts});
const fetchPostsErrorAction = (errorMessage) => ({type: FETCH_POSTS_ERRORR, payload: errorMessage});
const uploadingPostAction = () => ({type: UPLOADING_POST});
const uploadPostSuccessAction = (post) => ({type: UPLOAD_POST_SUCCESS, payload: post});
const uploadPostErrorAction = (errorMessage) => ({type: UPLOAD_POST_ERROR, payload: errorMessage});

export const setSortOptionAction = (payload) => ({type: SET_SORT_OPTION, payload});
export const setPostsLimitAction = (payload) => ({type: SET_POSTS_LIMIT, payload});
export const turnOverPageAction = (payload) => ({type: TURN_OVER_PAGE, payload});
export const setSearchQuerryAction = (payload) => ({type: SET_SEARCH_QUERRY, payload});
export const clearUploadErrorAction = () => ({type: CLEAR_UPLOAD_ERROR});
export const fetchPostsAction = () => {
    return function (dispatch) {
        dispatch(fetchingPostsAction());

        fetch('http://localhost:5000/posts')
            .then(response => response.ok ? response.json() : Promise.reject(response))
            .then(json => dispatch(fetchPostsSuccessAction(json)))
            .catch(() => dispatch(fetchPostsErrorAction('Произошла ошибка при попытке загрузить посты. Попробуйте позже...')));
    }
}
export const uploadPostAction = (newPost) => {
    return function (dispatch) {
        dispatch(uploadingPostAction());

        fetch('http://localhost:5000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newPost)
        })
            .then(respone => respone.ok ? respone.json() : Promise.reject(respone))
            .then(json => dispatch(uploadPostSuccessAction(json)))
            .catch(() => dispatch(uploadPostErrorAction('Произошла ошибка при попытке опубликовать пост. Попробуйте позже...')));

    }
}


export function postReducer(state = defaultState, action) {
    switch(action.type) {
        case SET_SORT_OPTION:
            return {...state, curSortOption: action.payload};
        case SET_POSTS_LIMIT:
            return {...state, postsLimit: action.payload};
        case TURN_OVER_PAGE:
            return {...state, page: action.payload}; 
        case SET_SEARCH_QUERRY:
            return {...state, searchQuerry: action.payload};
        case FETCHING_POSTS:
            return {...state, error: '', isFetching: true};
        case FETCH_POSTS_SUCCESS:
            return {...state, posts: action.payload, isFetching: false};
        case FETCH_POSTS_ERRORR:
            return {...state, error: action.payload, isFetching: false};
        case UPLOADING_POST:
            return {...state, uploadError: '', isUploading: true};
        case UPLOAD_POST_SUCCESS: 
            return {...state, posts: [...state.posts, action.payload], isUploading: false};
        case UPLOAD_POST_ERROR:
            return {...state, uploadError: action.payload, isUploading: false};
        case CLEAR_UPLOAD_ERROR:
            return {...state, uploadError: ''};
        default: 
            return state;
    }
}


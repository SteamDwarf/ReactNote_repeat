const defaultState = {
    browsePost: [],
    postComments: [],
    isFetchingPost: false,
    isFetchingComments: false,
    isUploadingComment: false,
    fetchPostError: '',
    fetchCommentsError: '',
    uploadingCommentError: ''
}

const FETCHING_POST = 'FETCHING_POST';
const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
const FETCH_POST_ERROR = 'FETCH_POST_ERROR';
const FETCHING_COMMENTS = 'FETCHING_COMMENTS';
const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
const FETCH_COMMENTS_ERROR = 'FETCH_COMMENTS_ERROR';
const UPLOADING_COMMENT = 'UPLOADING_COMMENT';
const UPLOAD_COMMENT_SUCCESS = 'UPLOAD_COMMENT_SUCCESS';
const UPLOAD_COMMENT_ERROR = 'UPLOAD_COMMENT_ERROR';

const fetchingPostAction = () => ({type: FETCHING_POST});
const fetchPostSuccessAction = (post) => ({type: FETCH_POST_SUCCESS, payload: post});
const fetchPostErrorAction = (errorMessage) => ({type: FETCH_POST_ERROR, payload: errorMessage});
const fetchingCommentsAction = () => ({type: FETCHING_COMMENTS});
const fetchCommentsSuccessAction = (post) => ({type: FETCH_COMMENTS_SUCCESS, payload: post});
const fetchCommentsErrorAction = (errorMessage) => ({type: FETCH_COMMENTS_ERROR, payload: errorMessage});
const uploadingCommentAction = () => ({type: UPLOADING_COMMENT});
const uploadCommentSuccessAction = (comment) => ({type: UPLOAD_COMMENT_SUCCESS, payload: comment});
const uploadCommentErrorAction = (errorMessage) => ({type: UPLOAD_COMMENT_ERROR, payload: errorMessage});

export const fetchBrowsePostInformation = (id) => {
    return function(dispatch) {
        dispatch(fetchingPostAction());
        
        fetch(`http://localhost:5000/posts/${id}`)
            .then(response => response.ok ? response.json() : Promise.reject(response))
            .then(post => dispatch(fetchPostSuccessAction(post)))
            .catch(() => dispatch(fetchPostErrorAction('Не удалось загрузить пост. Попробуйте позже...')));

        dispatch(fetchingCommentsAction());

        fetch(`http://localhost:5000/posts/${id}/comments`)
            .then(response => response.ok ? response.json() : Promise.reject(response))
            .then(comments => dispatch(fetchCommentsSuccessAction(comments)))
            .catch(() => dispatch(fetchCommentsErrorAction('Не удалось загрузить комментарии. Попробуйте позже...')))
            
    }
}
export const uploadComment = (id, comment) => {
    return function(dispatch) {
        dispatch(uploadingCommentAction());

        fetch(`http://localhost:5000/posts/${id}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(comment)
        })
            .then(response => response.ok ? response.json() : Promise.reject(response))
            .then(data => dispatch(uploadCommentSuccessAction(data)))
            .catch(() => dispatch(uploadCommentErrorAction('Создать комментарий не удалось. Попробуйте позже...')))
    }
}


export function browsePostReducer(state = defaultState, action) {
    switch(action.type) {
        case FETCHING_POST:
            return {...state, isFetchingPost: true};
        case FETCH_POST_SUCCESS: 
            return {...state, browsePost: action.payload, isFetchingPost: false};
        case FETCH_POST_ERROR:
            return {...state, fetchPostError: action.payload, isFetchingPost: false};
        case FETCHING_COMMENTS:
            return {...state, isFetchingComments: true};
        case FETCH_COMMENTS_SUCCESS: 
            return {...state, postComments: action.payload, isFetchingComments: false};
        case FETCH_COMMENTS_ERROR:
            return {...state, fetchCommentsError: action.payload, isFetchingComments: false};
        case UPLOADING_COMMENT:
            return {...state, isUploadingComment: true};
        case UPLOAD_COMMENT_SUCCESS:
            return {...state, postComments: [...state.postComments, action.payload], isUploadingComment: false};
        case UPLOAD_COMMENT_ERROR:
            return {...state, uploadingCommentError: action.payload, isUploadingComment: false};
        default: return state;
    }
}
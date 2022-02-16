const defaultState = {
    newPostModalShown: false,
    isValidUserData: true
}

const SHOW_HIDE_NEW_POST_MODAL = 'SHOW_HIDE_NEW_POST_MODAL';
const SET_USER_DATA_VALID_STATE = 'SET_USER_DATA_VALID_STATE';


export function UIReducer(state = defaultState, action) {
    switch(action.type) {
        case SHOW_HIDE_NEW_POST_MODAL:
            return {...state, newPostModalShown: action.payload};
        case SET_USER_DATA_VALID_STATE:
            return {...state, isValidUserData: action.payload};
        default: return state
    }
}

export const showHideNewPostModalAction = (payload) => ({type: SHOW_HIDE_NEW_POST_MODAL, payload});
export const setUserDataValidStateAction = (payload) => ({type: SET_USER_DATA_VALID_STATE, payload});

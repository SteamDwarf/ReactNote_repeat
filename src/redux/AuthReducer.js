const defaultState = {
    isAuth: false,
    currentUser: {},
    newUser: {username:'', password:''}
}

const SIGN_IN = 'SIGN_IN';
const SIGN_OUT = 'SIGN_OUT';
const SET_CURRENT_USER = 'SET_CURRENT_USER';
const ENTER_USERNAME = 'ENTER_USERNAME';
const ENTER_PASSWORD = 'ENTER_PASSWORD';

export function authReducer(state = defaultState, action) {
    switch(action.type) {
        case SIGN_IN:
            return {...state, isAuth: true};
        case SIGN_OUT:
            return {...state, isAuth: false};
        case SET_CURRENT_USER:
            return {...state, currentUser: action.payload};
        case ENTER_USERNAME:
            return {...state, newUser: {...state.newUser, username: action.payload}}
        case ENTER_PASSWORD:
            return {...state, newUser: {...state.newUser, password: action.payload}}
        default: return state
    }
}

export const signInAction = (payload) => ({type: SIGN_IN, payload});
export const signOutAction = (payload) => ({type: SIGN_OUT, payload});
export const setCurrentUserAction = (payload) => ({type: SET_CURRENT_USER, payload});
export const enterUsernameAction = (payload) => ({type: ENTER_USERNAME, payload});
export const enterPasswordAction = (payload) => ({type: ENTER_PASSWORD, payload});

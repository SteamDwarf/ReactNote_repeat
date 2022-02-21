const defaultState = {
    isAuth: false,
    currentUser: {},
    newUser: {username:'', password:''},
    authError: '',
    existingUser: [],
}

const SIGN_IN = 'SIGN_IN';
const SIGN_OUT = 'SIGN_OUT';
const SET_CURRENT_USER = 'SET_CURRENT_USER';
const ENTER_USERNAME = 'ENTER_USERNAME';
const ENTER_PASSWORD = 'ENTER_PASSWORD';
const SET_AUTH_ERROR = 'SET_AUTH_ERROR ';
const SET_EXISTING_USER = 'SET_EXISTING_USER';

export const signInAction = (payload) => ({type: SIGN_IN, payload});
export const signOutAction = (payload) => ({type: SIGN_OUT, payload});
export const setCurrentUserAction = (payload) => ({type: SET_CURRENT_USER, payload});
export const enterUsernameAction = (payload) => ({type: ENTER_USERNAME, payload});
export const enterPasswordAction = (payload) => ({type: ENTER_PASSWORD, payload});
export const setAuthErrorAction = (errorMessage) => ({type: SET_AUTH_ERROR, payload: errorMessage});
const setExistingUserAction = (user) => ({type: SET_EXISTING_USER, payload: user});

export function findExistingUser(field, value) {
    return function(dispatch) {
        fetch(`http://localhost:5000/users?${field}=${value}`)
            .then(response => response.ok ? response.json() : Promise.reject(response))
            .then(data => dispatch(setExistingUserAction(data)))
            .catch(() => console.log('path not found'));
    }
}

export function authReducer(state = defaultState, action) {
    switch(action.type) {
        case SIGN_IN:
            return {...state, isAuth: true, authError: '', newUser: {username:'', password:''}};
        case SIGN_OUT:
            return {...state, isAuth: false};
        case SET_CURRENT_USER:
            return {...state, currentUser: action.payload};
        case ENTER_USERNAME:
            return {...state, newUser: {...state.newUser, username: action.payload}};
        case ENTER_PASSWORD:
            return {...state, newUser: {...state.newUser, password: action.payload}};
        case SET_AUTH_ERROR: 
            return {...state, authError: action.payload};
        case SET_EXISTING_USER:
            return {...state, existingUser: action.payload};
        default: return state
    }
}



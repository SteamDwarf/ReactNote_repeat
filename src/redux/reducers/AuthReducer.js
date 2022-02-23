const defaultState = {
    isSigningIn: false,
    isAuth: false,
    currentUser: {},
    newUser: {username:'', password:''},
    authError: '',
    registerError: {username: '', email: '', password: ''}
}
//TODO isUsernameExist и isEmailExist переделать в строковые переменные

const SIGN_IN = 'SIGN_IN';
const SIGNING_IN = 'SIGNING_IN';
const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
const SIGN_IN_ERROR = 'SIGN_IN_ERROR';
const SIGN_OUT = 'SIGN_OUT';
const SET_CURRENT_USER = 'SET_CURRENT_USER';
const ENTER_USERNAME = 'ENTER_USERNAME';
const ENTER_PASSWORD = 'ENTER_PASSWORD';
const SET_AUTH_ERROR = 'SET_AUTH_ERROR ';
const SET_USERNAME_ERROR = 'SET_USERNAME_ERROR';
const SET_EMAIL_ERROR = 'SET_EMAIL_ERROR';
const SET_PASSWORD_ERROR = 'SET_PASSWORD_ERROR';

export const signInAction = (payload) => ({type: SIGN_IN, payload});
export const signingInAction = () => ({type: SIGNING_IN});
export const signInSuccessAction = (user) => ({type: SIGN_IN_SUCCESS, payload: user});
export const signInErrorAction = (errorMessage) => ({type: SIGN_IN_ERROR, payload: errorMessage});
export const signOutAction = (payload) => ({type: SIGN_OUT, payload});

export const setCurrentUserAction = (payload) => ({type: SET_CURRENT_USER, payload});
export const enterUsernameAction = (payload) => ({type: ENTER_USERNAME, payload});
export const enterPasswordAction = (payload) => ({type: ENTER_PASSWORD, payload});
export const setAuthErrorAction = (errorMessage) => ({type: SET_AUTH_ERROR, payload: errorMessage});
export const setUsernameErrorAction = (errorMessage) => ({type: SET_USERNAME_ERROR, payload: errorMessage});
export const setEmailErrorAction = (errorMessage) => ({type: SET_EMAIL_ERROR, payload: errorMessage});
export const setPasswordErrorAction = (errorMessage) => ({type: SET_PASSWORD_ERROR, payload: errorMessage});

export function findExistingUser(field, value) {
    return function(dispatch) {
        fetch(`http://localhost:5000/users?${field}=${value}`)
            .then(response => response.ok ? response.json() : Promise.reject(response))
            .then(data => setExistingUser(field, data, dispatch))
            .catch(() => console.log('path not found'));
    }
}
export function registerNewUser(newUserData) {
    return function(dispatch) {
        fetch(`http://localhost:5000/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newUserData)
        })
            .then(response => response.ok ? response.json() : Promise.reject(response))
            .then(data => dispatch(signInSuccessAction(data)))
            .catch(() => dispatch(signInErrorAction('Регистрация не удалась. Попробуйте позже...')))
    }
}

export function authReducer(state = defaultState, action) {
    switch(action.type) {
        case SIGN_IN:
            return {...state, isAuth: true, authError: '', newUser: {username:'', password:''}};
        case SIGNING_IN:
            return {...state, isSigningIn: true, authError: ''};
        case SIGN_IN_SUCCESS:
            return {...state, isSigningIn: false, currentUser: action.payload, isAuth: true}
        case SIGN_IN_ERROR:
            return {...state, isSigningIn: false, authError: action.payload};
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
        case SET_USERNAME_ERROR:
            return {...state, registerError: {...state.registerError, username: action.payload}};
        case SET_EMAIL_ERROR:
            return {...state, registerError: {...state.registerError, email: action.payload}};
        case SET_PASSWORD_ERROR:
            return {...state, registerError: {...state.registerError, password: action.payload}};
        default: return state
    }
}

function setExistingUser(field, dataResponse, dispatch) {
    if(field === 'username' && dataResponse.length > 0) {
        dispatch(setUsernameErrorAction('Пользователь с таким логином уже зарегистрирован. '));
        return;
    }
    if(field === 'email' && dataResponse.length > 0) {
        dispatch(setEmailErrorAction('Пользователь с такой электронной почтой уже зарегистрирован. '));
        return;
    }
}


import API from '../helpers/API'

export const LOGIN_REQUESTED = 'session/LOGIN_REQUESTED'
export const LOGIN_SUCCESS = 'session/LOGIN_SUCCESS'
export const LOGIN_FAILED = 'session/LOGIN_FAILED'
export const LOG_OUT = 'session/LOGOUT'
export const REGISTER_REQUEST = 'session/REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'session/REGISTER_SUCCESS'
export const REGISTER_FAILED = 'session/REGISTER_FAILED'


const initialState = {
    isLoggedIn: false,
    isLoggingIn: false,
    loginFailed: false,
    token: null,
    userId: null,
    userName: null,
    isRegistering: false,
    isRegistered: false,
    registerFailed: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUESTED:
            return {
                ...state,
                isLoggingIn: true,
                loginFailed: false
            }
        
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                isLoggingIn: false,
                token: action.payload.token,
                userId: action.payload.userId,
                userName: action.payload.userName
            }
        case LOGIN_FAILED:
            return {
                ...state,
                loginFailed: true,
                isLoggingIn: false
            }
        case LOG_OUT:
            return {
                ...state,
                isLoggedIn: false,
                isLoggingIn: false,
                loginFailed: false,
                token: null,
                userId: null,
                userName: null
            }
        case REGISTER_REQUEST:
            return {
                ...state,
                isRegistering: true,
                registerFailed: false,
                isRegistered: false
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isRegistering: false,
                isRegistered: true,
            }
        case REGISTER_FAILED:
            return {
                ...state,
                isRegistering: false,
                registerFailed: true
            }

        default:
            return state
    }
}

export const loginRequest = (username, password) => {
    return dispatch => {
        dispatch({
            type: LOGIN_REQUESTED
        })
        API.post('/users/login', {
            username,
            password
        })
        .then(res => {
            API.setToken(res.token)
            localStorage.setItem('token', res.token)
            localStorage.setItem('userId', res.id)
            localStorage.setItem('userName', res.username)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    token: res.token,
                    userId: res.id,
                    userName: res.username
                }
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: LOGIN_FAILED
            })
        })
    }
}

export const getFromLocalStorage = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')
        const userName = localStorage.getItem('userName')
        if (token && userId && userName) {
            API.setToken(token)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    token,
                    userId,
                    userName
                }
            })
        }
    }
}

export const logOut = () => {
    return dispatch => {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('userName')
        API.setToken(null)
        dispatch({
            type: LOG_OUT
        })
    }
}

export const registerRequest = ({ username, password, firstname, lastname}) => {
    return dispatch => {
        API.post('/users/register', {
            username,
            password,
            firstname,
            lastname
        })
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: REGISTER_FAILED
            })
        })
    }
}

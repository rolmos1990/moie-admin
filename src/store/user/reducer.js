import {
    CHANGE_PASSWORD, CHANGE_PASSWORD_FAILED, CHANGE_PASSWORD_SUCCESS,
    GET_USER,
    GET_USER_FAILED,
    GET_USER_SUCCESS,
    GET_USERS,
    GET_USERS_FAILED,
    GET_USERS_SUCCESS,
    REGISTER_USER,
    REGISTER_USER_FAILED,
    REGISTER_USER_SUCCESS, RESET_CHANGE_PASSWORD,
    UPDATE_USER, UPDATE_USER_FAILED,
    UPDATE_USER_SUCCESS, USER_CHANGE_PASSWORD
} from "./actionTypes";

const initialState = {
    error: "",
    loading: false,
    meta: {},
    users: [],
    user: {},
    refresh: false,
    changePassword: {
        user: null,
        loading: false,
        success: null,
        error: null,
    }
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                loading: true,
            }
        case GET_USERS_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: true,
            }

        case GET_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
                meta: action.meta,
                loading: false,
            }
        case GET_USER:
            return {
                ...state,
                loading: true,
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loading: false,
            }
        case GET_USER_FAILED:
            return {
                ...state,
                loading: false,
            }
        case REGISTER_USER:
            state = {
                ...state,
                loading: true,
            }
            break
        case REGISTER_USER_SUCCESS:
            state = {
                ...state,
                loading: false,
            }
            break
        case REGISTER_USER_FAILED:
            state = {
                ...state,
                loading: false,
            }
            break
        case UPDATE_USER:
            state = {
                ...state,
                loading: true,
            }
            break
        case UPDATE_USER_SUCCESS:
            state = {
                ...state,
                loading: false,
            }
            break
        case UPDATE_USER_FAILED:
            state = {
                ...state,
                loading: false,
            }
            break
        case USER_CHANGE_PASSWORD:
            state = {
                ...state,
                changePassword: {
                    ...state.changePassword,
                    user: action.user,
                }
            }
            break
        case RESET_CHANGE_PASSWORD:
            state = {
                ...state,
                changePassword: {
                    ...state.changePassword,
                    user: null,
                    loading: false,
                    success: null,
                    error: null,
                }
            }
            break
        case CHANGE_PASSWORD:
            state = {
                ...state,
                changePassword: {
                    ...state.changePassword,
                    loading: true,
                    success: null,
                    error: null,
                }
            }
            break
        case CHANGE_PASSWORD_SUCCESS:
            state = {
                ...state,
                changePassword: {
                    ...state.changePassword,
                    user: null,
                    loading: false,
                    success: true,
                    error: null,
                }
            }
            break
        case CHANGE_PASSWORD_FAILED:
            state = {
                ...state,
                changePassword: {
                    ...state.changePassword,
                    error: action.error,
                    success: null,
                    loading: false,
                }
            }
            break
        default:
            state = { ...state }
            break
    }
    return state
}

export default user

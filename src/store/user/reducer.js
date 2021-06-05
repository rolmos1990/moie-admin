import {
    GET_USER,
    GET_USER_FAILED,
    GET_USER_SUCCESS,
    GET_USERS,
    GET_USERS_FAILED,
    GET_USERS_SUCCESS,
    REGISTER_USER,
    REGISTER_USER_FAILED,
    REGISTER_USER_SUCCESS,
    UPDATE_USER, UPDATE_USER_FAILED,
    UPDATE_USER_SUCCESS
} from "./actionTypes";

const initialState = {
    error: "",
    loading: false,
    meta: {},
    users: [],
    user: {},
    refresh: false
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
        default:
            state = { ...state }
            break
    }
    return state
}

export default user

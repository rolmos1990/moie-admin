import {
    GET_CATEGORY,
    GET_CATEGORY_FAILED,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORIES,
    GET_CATEGORIES_FAILED,
    GET_CATEGORIES_SUCCESS,
    REGISTER_CATEGORY,
    REGISTER_CATEGORY_FAILED,
    REGISTER_CATEGORY_SUCCESS,
    UPDATE_CATEGORY, UPDATE_CATEGORY_FAILED,
    UPDATE_CATEGORY_SUCCESS
} from "./actionTypes";

const initialState = {
    error: "",
    loading: false,
    meta: {},
    categories: [],
    category: {},
    refresh: false
}

const category = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORIES:
            return {
                ...state,
                loading: true,
            }
        case GET_CATEGORIES_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: true,
            }

        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload,
                meta: action.meta,
                loading: false,
            }
        case GET_CATEGORY:
            return {
                ...state,
                loading: true,
            }
        case GET_CATEGORY_SUCCESS:
            return {
                ...state,
                category: action.payload,
                loading: false,
            }
        case GET_CATEGORY_FAILED:
            return {
                ...state,
                loading: false,
            }
        case REGISTER_CATEGORY:
            state = {
                ...state,
                loading: true,
            }
            break
        case REGISTER_CATEGORY_SUCCESS:
            state = {
                ...state,
                loading: false,
            }
            break
        case REGISTER_CATEGORY_FAILED:
            state = {
                ...state,
                loading: false,
            }
            break
        case UPDATE_CATEGORY:
            state = {
                ...state,
                loading: true,
            }
            break
        case UPDATE_CATEGORY_SUCCESS:
            state = {
                ...state,
                loading: false,
            }
            break
        case UPDATE_CATEGORY_FAILED:
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

export default category

import {
    GET_PRODUCT_SIZES,
    GET_PRODUCT_SIZES_FAILED,
    GET_PRODUCT_SIZES_SUCCESS,
    GET_PRODUCT_SIZE,
    GET_PRODUCT_SIZE_FAILED,
    GET_PRODUCT_SIZE_SUCCESS,
    REGISTER_PRODUCT_SIZE,
    REGISTER_PRODUCT_SIZE_FAILED,
    REGISTER_PRODUCT_SIZE_SUCCESS,
    UPDATE_PRODUCT_SIZE, UPDATE_PRODUCT_SIZE_FAILED,
    UPDATE_PRODUCT_SIZE_SUCCESS, UPDATE_PRODUCT_SIZE_LIST, UPDATE_PRODUCT_SIZE_LIST_SUCCESS, UPDATE_PRODUCT_SIZE_LIST_FAILED
} from "./actionTypes";

const initialState = {
    error: "",
    loading: false,
    meta: {},
    productSizes: [],
    productSize: {},
    refresh: false
}

const productSizes = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCT_SIZES:
            return {
                ...state,
                loading: true,
            }
        case GET_PRODUCT_SIZES_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: false,
            }

        case GET_PRODUCT_SIZES_SUCCESS:
            return {
                ...state,
                productSizes: action.payload,
                meta: action.meta,
                loading: false,
            }
        case GET_PRODUCT_SIZE:
            return {
                ...state,
                loading: true,
            }
        case GET_PRODUCT_SIZE_SUCCESS:
            return {
                ...state,
                productSize: action.payload,
                loading: false,
            }
        case GET_PRODUCT_SIZE_FAILED:
            return {
                ...state,
                loading: false,
            }
        case REGISTER_PRODUCT_SIZE:
            state = {
                ...state,
                loading: true,
            }
            break
        case REGISTER_PRODUCT_SIZE_SUCCESS:
            state = {
                ...state,
                loading: false,
            }
            break
        case REGISTER_PRODUCT_SIZE_FAILED:
            state = {
                ...state,
                loading: false,
            }
            break
        case UPDATE_PRODUCT_SIZE:
            state = {
                ...state,
                loading: true,
            }
            break
        case UPDATE_PRODUCT_SIZE_SUCCESS:
            state = {
                ...state,
                loading: false,
            }
            break
        case UPDATE_PRODUCT_SIZE_FAILED:
            state = {
                ...state,
                loading: false,
            }
            break
        case UPDATE_PRODUCT_SIZE_LIST:
            state = {
                ...state,
                loading: true,
            }
            break
        case UPDATE_PRODUCT_SIZE_LIST_SUCCESS:
            state = {
                ...state,
                loading: false,
            }
            break
        case UPDATE_PRODUCT_SIZE_LIST_FAILED:
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

export default productSizes

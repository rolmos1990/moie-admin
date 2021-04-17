import {
    GET_PRODUCT,
    GET_PRODUCT_FAILED,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCTS, GET_PRODUCTS_FAILED, GET_PRODUCTS_SUCCESS,
    REGISTER_PRODUCT,
    REGISTER_PRODUCT_FAILED,
    REGISTER_PRODUCT_SUCCESS,
    UPDATE_PRODUCT, UPDATE_PRODUCT_FAILED,
    UPDATE_PRODUCT_SUCCESS
} from "./actionTypes";

const initialState = {
    error: "",
    loading: false,
    meta: {},
    products: [],
    product: {},
    refresh: false
}

const product = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                loading: true,
            }
        case GET_PRODUCTS_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: true,
            }

        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                product: {},
                products: action.payload,
                meta: action.meta,
                loading: false,
            }
        case GET_PRODUCT:
            return {
                ...state,
                loading: true,
            }
        case GET_PRODUCT_SUCCESS:
            return {
                ...state,
                product: action.payload,
                loading: false,
            }
        case GET_PRODUCT_FAILED:
            return {
                ...state,
                loading: false,
            }
        case REGISTER_PRODUCT:
            state = {
                ...state,
                loading: true,
            }
            break
        case REGISTER_PRODUCT_SUCCESS:
            state = {
                ...state,
                loading: false,
                product: action.payload
            }
            break
        case REGISTER_PRODUCT_FAILED:
            state = {
                ...state,
                loading: false,
            }
            break
        case UPDATE_PRODUCT:
            state = {
                ...state,
                loading: true,
            }
            break
        case UPDATE_PRODUCT_SUCCESS:
            state = {
                ...state,
                loading: false,
            }
            break
        case UPDATE_PRODUCT_FAILED:
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

export default product

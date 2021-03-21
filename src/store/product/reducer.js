import {
    GET_PRODUCTS,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAILED
} from "./actionTypes"

const initialState = {
    error: "",
    loading: false,
    meta: {},
    products: [],
    product:{}
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
                loading: false,
            }

        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload,
                loading: false,
            }
        default:
            state = { ...state }
            break
    }
    return state
}

export default product

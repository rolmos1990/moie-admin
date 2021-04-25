import {
    GET_ORDER,
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS,
    GET_ORDERS,
    GET_ORDERS_FAILED,
    GET_ORDERS_SUCCESS,
    REGISTER_ORDER,
    REGISTER_ORDER_FAILED,
    REGISTER_ORDER_SUCCESS,
    UPDATE_ORDER, UPDATE_ORDER_FAILED,
    UPDATE_ORDER_SUCCESS
} from "./actionTypes";

const initialState = {
    error: "",
    loading: false,
    meta: {},
    orders: [],
    order: {},
    refresh: false
}

const order = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDERS:
            return {
                ...state,
                loading: true,
            }
        case GET_ORDERS_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: true,
            }

        case GET_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.payload,
                meta: action.meta,
                loading: false,
            }
        case GET_ORDER:
            return {
                ...state,
                loading: true,
            }
        case GET_ORDER_SUCCESS:
            return {
                ...state,
                order: action.payload,
                loading: false,
            }
        case GET_ORDER_FAILED:
            return {
                ...state,
                loading: false,
            }
        case REGISTER_ORDER:
            state = {
                ...state,
                loading: true,
            }
            break
        case REGISTER_ORDER_SUCCESS:
            state = {
                ...state,
                loading: false,
            }
            break
        case REGISTER_ORDER_FAILED:
            state = {
                ...state,
                loading: false,
            }
            break
        case UPDATE_ORDER:
            state = {
                ...state,
                loading: true,
            }
            break
        case UPDATE_ORDER_SUCCESS:
            state = {
                ...state,
                loading: false,
            }
            break
        case UPDATE_ORDER_FAILED:
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

export default order

import {
    GET_PAYMENT,
    GET_PAYMENT_FAILED,
    GET_PAYMENT_SUCCESS,
    GET_PAYMENTS,
    GET_PAYMENTS_FAILED,
    GET_PAYMENTS_SUCCESS,
    REGISTER_PAYMENT,
    REGISTER_PAYMENT_FAILED,
    REGISTER_PAYMENT_SUCCESS,
    UPDATE_PAYMENT,
    UPDATE_PAYMENT_FAILED,
    UPDATE_PAYMENT_SUCCESS
} from "./actionTypes";

const initialState = {
    error: "",
    loading: false,
    meta: {},
    payments: [],
    payment: {},
    refresh: false
}

const payments = (state = initialState, action) => {
    switch (action.type) {
        case GET_PAYMENTS:
            return {
                ...state,
                loading: true,
            }
        case GET_PAYMENTS_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: true,
            }

        case GET_PAYMENTS_SUCCESS:
            return {
                ...state,
                payments: action.payload,
                meta: action.meta,
                loading: false,
            }
        case GET_PAYMENT:
            return {
                ...state,
                loading: true,
            }
        case GET_PAYMENT_SUCCESS:
            return {
                ...state,
                payment: action.payload,
                loading: false,
            }
        case GET_PAYMENT_FAILED:
            return {
                ...state,
                loading: false,
            }
        case REGISTER_PAYMENT:
            state = {
                ...state,
                loading: true,
            }
            break
        case REGISTER_PAYMENT_SUCCESS:
            state = {
                ...state,
                loading: false,
            }
            break
        case REGISTER_PAYMENT_FAILED:
            state = {
                ...state,
                loading: false,
            }
            break
        case UPDATE_PAYMENT:
            state = {
                ...state,
                loading: true,
            }
            break
        case UPDATE_PAYMENT_SUCCESS:
            state = {
                ...state,
                loading: false,
            }
            break
        case UPDATE_PAYMENT_FAILED:
            state = {
                ...state,
                loading: false,
            }
            break
        default:
            state = {...state}
            break
    }
    return state
}

export default payments
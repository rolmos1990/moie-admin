import {
    DELETE_CUSTOMER,
    DELETE_CUSTOMER_FAILED,
    DELETE_CUSTOMER_SUCCESS,
    GET_CUSTOMER_FAILED,
    GET_CUSTOMER_SUCCESS,
    REGISTER_CUSTOMER,
    REGISTER_CUSTOMER_FAILED,
    REGISTER_CUSTOMER_SUCCESS,
    UPDATE_CUSTOMER,
    UPDATE_CUSTOMER_FAILED,
    UPDATE_CUSTOMER_SUCCESS,
    GET_CUSTOMERS_FAILED,
    GET_CUSTOMERS_SUCCESS, RESET_CUSTOMERS

} from "./actionTypes"
import {GET_CUSTOMER, GET_CUSTOMERS} from "../../helpers/url_helper";

const initialState = {
    error: "",
    loading: false,
    meta: {},
    customers: [],
    customer: {},
    refresh: false
}

const customer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_CUSTOMERS:
            return {
                ...initialState
            }
        case GET_CUSTOMERS:
            return {
                ...state,
                loading: true,
            }
        case GET_CUSTOMERS_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: true,
            }

        case GET_CUSTOMERS_SUCCESS:
            return {
                ...state,
                customers: action.payload,
                meta: action.meta,
                loading: false,
            }
        case GET_CUSTOMER:
            return {
                ...state,
                loading: true,
            }
        case GET_CUSTOMER_SUCCESS:
            return {
                ...state,
                customer: action.payload,
                loading: false,
            }
        case GET_CUSTOMER_FAILED:
            return {
                ...state,
                loading: false,
            }
        case REGISTER_CUSTOMER:
            state = {
                ...state,
                error: false,
                loading: true,
            }
            break
        case REGISTER_CUSTOMER_SUCCESS:
            state = {
                ...state,
                loading: false,
                customer: action.payload
            }
            break
        case REGISTER_CUSTOMER_FAILED:
            state = {
                ...state,
                error: true,
                loading: false,
            }
            break
        case UPDATE_CUSTOMER:
            state = {
                ...state,
                loading: true,
            }
            break
        case UPDATE_CUSTOMER_SUCCESS:
            state = {
                ...state,
                loading: false,
            }
            break
        case UPDATE_CUSTOMER_FAILED:
            state = {
                ...state,
                loading: false,
            }
            break
        case DELETE_CUSTOMER:
            state = {
                ...state,
                loading: true,
            }
            break
        case DELETE_CUSTOMER_SUCCESS:
            state = {
                ...state,
                loading: false,
                refresh: !state.refresh
            }
            break
        case DELETE_CUSTOMER_FAILED:
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

export default customer

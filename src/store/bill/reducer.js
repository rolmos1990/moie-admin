import {
    CONFIRM_BILL, CONFIRM_BILL_FAILED, CONFIRM_BILL_SUCCESS,
    DELETE_BILL, DELETE_BILL_FAILED, DELETE_BILL_SUCCESS,
    GET_BILL,
    GET_BILL_FAILED,
    GET_BILL_SUCCESS,
    GET_BILLS, GET_BILLS_FAILED, GET_BILLS_SUCCESS, QUERY_BILLS, QUERY_BILLS_FAILED, QUERY_BILLS_SUCCESS,
    REGISTER_BILL,
    REGISTER_BILL_FAILED,
    REGISTER_BILL_SUCCESS, RESET_BILL,
    UPDATE_BILL, UPDATE_BILL_FAILED,
    UPDATE_BILL_SUCCESS
} from "./actionTypes";
import {
    DELETE_CUSTOMER,
    DELETE_CUSTOMER_FAILED,
    DELETE_CUSTOMER_SUCCESS,
    RESET_CUSTOMERS
} from "../customer/actionTypes";

const initialState = {
    error: "",
    loading: false,
    meta: {},
    bills: [],
    bill: {},
    custom: {
        loading: false,
        meta: {},
        data: {}
    },
    refresh: false
}

const bill = (state = initialState, action) => {
    switch (action.type) {
        case RESET_BILL:
            return {
                ...initialState
            }
        case GET_BILLS:
            return {
                ...state,
                loading: true,
            }
        case GET_BILLS_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        case GET_BILLS_SUCCESS:
            return {
                ...state,
                bills: action.payload,
                meta: action.meta,
                loading: false,
            }
        case QUERY_BILLS:
            return {
                ...state,
                custom: {
                    ...state.custom,
                    loading: true
                }
            }
        case QUERY_BILLS_FAILED:
            return {
                ...state,
                custom: {
                    ...state.custom,
                    error: action.payload,
                    loading: false,
                }
            }
        case QUERY_BILLS_SUCCESS:
            const data = {...state.custom.data};
            data[action.node] = action.payload;

            return {
                ...state,
                custom: {
                    ...state.custom,
                    data: data,
                    meta: action.meta,
                    loading: false
                }
            }
        case GET_BILL:
            return {
                ...state,
                refresh: false,
                loading: true,
            }
        case GET_BILL_SUCCESS:
            return {
                ...state,
                bill: action.payload,
                loading: false,
            }
        case GET_BILL_FAILED:
            return {
                ...state,
                loading: false,
            }
        case REGISTER_BILL:
            state = {
                ...state,
                loading: true,
            }
            break
        case REGISTER_BILL_SUCCESS:
            state = {
                ...state,
                loading: false,
                bill: action.payload
            }
            break
        case REGISTER_BILL_FAILED:
            state = {
                ...state,
                loading: false,
            }
            break
        case UPDATE_BILL:
            state = {
                ...state,
                loading: true,
            }
            break
        case UPDATE_BILL_SUCCESS:
            state = {
                ...state,
                refresh: true,
                loading: false,
            }
            break
        case UPDATE_BILL_FAILED:
            state = {
                ...state,
                loading: false,
            }
            break
        case DELETE_BILL:
            state = {
                ...state,
                loading: true,
            }
            break
        case DELETE_BILL_SUCCESS:
            state = {
                ...state,
                loading: false,
                refresh: !state.refresh
            }
            break
        case DELETE_BILL_FAILED:
            state = {
                ...state,
                loading: false,
            }
            break
        case CONFIRM_BILL:
            state = {
                ...state,
                loading: true,
            }
            break
        case CONFIRM_BILL_SUCCESS:
            state = {
                ...state,
                loading: false,
                refresh: !state.refresh
            }
            break
        case CONFIRM_BILL_FAILED:
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

export default bill

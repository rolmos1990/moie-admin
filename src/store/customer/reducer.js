import {
    GET_CUSTOMER_FAILED,
    GET_CUSTOMER_SUCCESS,
    REGISTER_CUSTOMER,
    REGISTER_CUSTOMER_SUCCESS,
} from "./actionTypes"
import {GET_USER_PROFILE_SUCCESS, GET_USERS_FAIL, GET_USERS_SUCCESS} from "../contacts/actionTypes";
import {GET_CUSTOMERS_FAIL, GET_CUSTOMERS_SUCCESS} from "../e-commerce/actionTypes";
import {GET_CUSTOMER, GET_CUSTOMERS} from "../../helpers/url_helper";

const initialState = {
    error: "",
    loading: false,
    customers: [],
    customer: {}
}

const customer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CUSTOMERS:
            return {
                ...state,
                loading: true,
            }
        case GET_CUSTOMERS_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false,
            }

        case GET_CUSTOMERS_SUCCESS:
            return {
                ...state,
                customers: action.payload,
                loading: false,
            }
        case GET_CUSTOMER:
            return {
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
                loading: false,
            }
        case REGISTER_CUSTOMER:
            state = {
                ...state,
                loading: true,
            }
            break
        case REGISTER_CUSTOMER_SUCCESS:
            state = {
                ...state,
                loading: true,
            }
            break
        default:
            state = { ...state }
            break
    }
    return state
}

export default customer

import {
    GET_CUSTOMER,
    GET_CUSTOMER_SUCCESS,
    GET_CUSTOMER_FAILED,
    REGISTER_CUSTOMER,
    REGISTER_CUSTOMER_SUCCESS,
    REGISTER_CUSTOMER_FAILED,
    GET_CUSTOMERS,
    GET_CUSTOMERS_SUCCESS,
    GET_CUSTOMERS_FAILED,
    UPDATE_CUSTOMER,
    UPDATE_CUSTOMER_SUCCESS,
    UPDATE_CUSTOMER_FAILED
} from "./actionTypes"
import {GET_USERS, GET_USERS_SUCCESS} from "../contacts/actionTypes";

export const getCustomers = () => ({
    type: GET_CUSTOMERS
})

export const getCustomersSuccess = customers => ({
    type: GET_CUSTOMERS_SUCCESS,
    payload: customers,
})

export const getCustomer = id => ({
    type: GET_CUSTOMER,
    id
})

export const getCustomersFail = error => ({
    type: GET_CUSTOMERS_FAILED,
    payload: error,
})

export const getCustomerSuccess = customer => ({
    type: GET_CUSTOMER_SUCCESS,
    payload: customer,
})

export const getCustomerFail = error => ({
    type: GET_CUSTOMER_FAILED,
    payload: error,
})

export const registerCustomer = (customer, history) => {
    return {
        type: REGISTER_CUSTOMER,
        payload: { customer, history },
    }
}

export const registerCustomerSuccess = customer => {
    return {
        type: REGISTER_CUSTOMER_SUCCESS,
        payload: customer,
    }
}


export const registerCustomerFail = customer => {
    return {
        type: REGISTER_CUSTOMER_FAILED,
        payload: customer,
    }
}

export const updateCustomer = (id, customer, history) => {
    return {
        type: UPDATE_CUSTOMER,
        payload: { id, customer, history },
    }
}

export const updateCustomerSuccess = customer => {
    return {
        type: UPDATE_CUSTOMER_SUCCESS,
        payload: customer,
    }
}


export const updateCustomerFail = error => {
    return {
        type: UPDATE_CUSTOMER_FAILED,
        payload: error,
    }
}

import {
    GET_ORDERS,
    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAILED,
    GET_ORDER,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    REGISTER_ORDER,
    REGISTER_ORDER_SUCCESS,
    REGISTER_ORDER_FAILED,
    UPDATE_ORDER,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAILED,
} from "./actionTypes";

export const getOrders = (conditional, limit, offset) => ({
    type: GET_ORDERS,
    conditional: conditional,
    limit: limit,
    offset: offset
})

export const getOrdersSuccess = (data, meta) => ({
    type: GET_ORDERS_SUCCESS,
    meta: meta,
    payload: data,
})

export const getOrdersFailed = error => ({
    type: GET_ORDERS_FAILED,
    payload: error,
})

export const getOrder = id => ({
    type: GET_ORDER,
    id
})

export const getOrderSuccess = data => ({
    type: GET_ORDER_SUCCESS,
    payload: data,
})

export const getOrderFailed = error => ({
    type: GET_ORDER_FAILED,
    payload: error,
})

export const registerOrder = (data, history) => {
    return {
        type: REGISTER_ORDER,
        payload: { data, history },
    }
}

export const registerOrderSuccess = data => {
    return {
        type: REGISTER_ORDER_SUCCESS,
        payload: data,
    }
}


export const registerOrderFailed = data => {
    return {
        type: REGISTER_ORDER_FAILED,
        payload: data,
    }
}

export const updateOrder = (id, data, history) => {
    return {
        type: UPDATE_ORDER,
        payload: { id, data, history },
    }
}

export const updateOrderSuccess = data => {
    return {
        type: UPDATE_ORDER_SUCCESS,
        payload: data,
    }
}


export const updateOrderFail = error => {
    return {
        type: UPDATE_ORDER_FAILED,
        payload: error,
    }
}

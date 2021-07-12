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
    GET_DELIVERY_METHODS,
    GET_DELIVERY_METHODS_SUCCESS,
    GET_DELIVERY_METHODS_FAILED,
    GET_DELIVERY_QUOTE,
    GET_DELIVERY_QUOTE_SUCCESS,
    GET_DELIVERY_QUOTE_FAILED,
    RESET_CAR,
    UPDATE_CAR,
    NEXT_STATUS_ORDER,
    RESUME_ORDER,
    print_ORDER,
    PRINT_ORDER,
    CUSTOM_ORDER_SUCCESS,
    CUSTOM_ORDER_FAILED,
    DO_BATCH_REQUEST,
    RESET_BATCH_REQUEST,
    PRINT_BATCH_REQUEST_SUCCESS,
    PRINT_BATCH_REQUEST_FAILED,
    PRINT_BATCH_REQUEST,
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

export const nextStatusOrder = (data, history) => {
    return {
        type: NEXT_STATUS_ORDER,
        payload: { data, history },
    }
}
export const resumeOrder = (id, history) => {
    return {
        type: RESUME_ORDER,
        payload: { id, history },
    }
}
export const printOrder = (id, history) => {
    return {
        type: PRINT_ORDER,
        payload: { id, history },
    }
}
export const customOrderSuccess = (data, node) => {
    return {
        type: CUSTOM_ORDER_SUCCESS,
        payload: data,
        node: node,
    }
}
export const customOrderFailed = data => {
    return {
        type: CUSTOM_ORDER_FAILED,
        payload: data,
    }
}

export const registerOrder = (data, history) => {
    return {
        type: REGISTER_ORDER,
        payload: { data, history },
    }
}

export const registerOrderSuccess = data => {
    return {
        type: REGISTER_ORDER_SUCCESS,
        payload: data.order,
    }
}


export const registerOrderFailed = data => {
    return {
        type: REGISTER_ORDER_SUCCESS,
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

export const getDeliveryMethods = (conditional, limit, offset) => ({
    type: GET_DELIVERY_METHODS,
    conditional: conditional,
    limit: limit,
    offset: offset
})
export const getDeliveryMethodsSuccess = (data, meta) => ({
    type: GET_DELIVERY_METHODS_SUCCESS,
    meta: meta,
    payload: data,
})
export const getDeliveryMethodsFailed = error => ({
    type: GET_DELIVERY_METHODS_FAILED,
    payload: error,
})

export const getDeliveryQuote = (request) => ({
    type: GET_DELIVERY_QUOTE,
    data: request
})

export const getDeliveryQuoteSuccess = (data, meta) => ({
    type: GET_DELIVERY_QUOTE_SUCCESS,
    meta: meta,
    payload: data,
})

export const getDeliveryQuoteFailed = error => ({
    type: GET_DELIVERY_QUOTE_FAILED,
    payload: error,
})


export const resetCar = () => ({type: RESET_CAR});

export const updateCard = (payload) => ({
    type: UPDATE_CAR,
    payload
})


//BATCH_REQUEST
export const doPrintBatchRequest = (conditionals) => ({
    type: DO_BATCH_REQUEST,
    conditionals: conditionals
})
export const resetBatchRequest = () => ({
    type: RESET_BATCH_REQUEST
})
export const printBatchRequest = (conditionals) => ({
    type: PRINT_BATCH_REQUEST,
    conditionals: conditionals
})
export const printBatchRequestSuccess = (data, meta) => ({
    type: PRINT_BATCH_REQUEST_SUCCESS,
    meta: meta,
    data: data,
})
export const printBatchRequestFailed = error => ({
    type: PRINT_BATCH_REQUEST_FAILED,
    error: error,
})
import {
    RESUME_ORDER,
    GET_DELIVERY_METHODS, GET_DELIVERY_METHODS_FAILED, GET_DELIVERY_METHODS_SUCCESS, GET_DELIVERY_QUOTE, GET_DELIVERY_QUOTE_FAILED, GET_DELIVERY_QUOTE_SUCCESS,
    GET_ORDER,
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS,
    GET_ORDERS,
    GET_ORDERS_FAILED,
    GET_ORDERS_SUCCESS,
    REGISTER_ORDER,
    REGISTER_ORDER_FAILED,
    REGISTER_ORDER_SUCCESS, RESET_CAR, UPDATE_CAR,
    UPDATE_ORDER, UPDATE_ORDER_FAILED,
    UPDATE_ORDER_SUCCESS, PRINT_ORDER, CUSTOM_ORDER_SUCCESS, CUSTOM_ORDER_FAILED, PRINT_BATCH_REQUEST, RESET_BATCH_REQUEST, PRINT_BATCH_REQUEST_SUCCESS, DO_BATCH_REQUEST, PRINT_BATCH_REQUEST_FAILED
} from "./actionTypes";

const initialState = {
    error: "",
    loading: false,
    meta: {},
    orders: [],
    order: {},
    refresh: false,
    deliveryMethods: {
        data: [],
        loading: false,
        error: "",
    },
    deliveryQuote: {
        data: {},
        loading: false,
        error: "",
    },
    car: {
        customer: {},
        products: [],
        deliveryOptions: {},
        summary: {},
        reset: true,
        isEdit: false,
        orderId: null,
    },
    custom:{
        data: {},
        meta: {},
        loading: false
    },
    batchRequest: {
        data: null,
        error: null,
        meta: {},
        conditionals: null,
        loading: false,
        doRequest: false
    }
}

const order = (state = initialState, action) => {
    switch (action.type) {
        case RESET_CAR:
            return {
                ...state,
                car: {
                    customer: {},
                    products: [],
                    deliveryOptions: {},
                    summary: {},
                    reset: true
                },
            }
        case UPDATE_CAR:
            return {
                ...state,
                car: {
                    ...state.car,
                    ...action.payload,
                    reset: false
                }
            }
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
                order: action.payload
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
                order: action.payload
            }
            break
        case UPDATE_ORDER_FAILED:
            state = {
                ...state,
                loading: false,
            }
            break
        case GET_DELIVERY_METHODS:
            return {
                ...state,
                deliveryMethods: {
                    ...state.deliveryMethods,
                    loading: true,
                }
            }
        case GET_DELIVERY_METHODS_SUCCESS:
            return {
                ...state,
                deliveryMethods: {
                    ...state.deliveryMethods,
                    data: action.payload,
                    loading: false,
                }
            }
        case GET_DELIVERY_METHODS_FAILED:
            return {
                ...state,
                deliveryMethods: {
                    ...state.deliveryMethods,
                    error: action.payload,
                    loading: false,
                }
            }
        case GET_DELIVERY_QUOTE:
            return {
                ...state,
                deliveryQuote: {
                    ...state.deliveryQuote,
                    loading: true,
                }
            }
        case GET_DELIVERY_QUOTE_SUCCESS:
            return {
                ...state,
                deliveryQuote: {
                    ...state.deliveryQuote,
                    data: action.payload,
                    loading: false,
                }
            }
        case GET_DELIVERY_QUOTE_FAILED:
            return {
                ...state,
                deliveryQuote: {
                    ...state.deliveryQuote,
                    error: action.payload,
                    loading: false,
                }
            }
        case RESUME_ORDER:
            return {
                ...state,
                custom:{
                    ...state.custom,
                    loading:true
                }
            }
        case PRINT_ORDER:
            return {
                ...state,
                custom:{
                    ...state.custom,
                    loading:true
                }
            }
        case CUSTOM_ORDER_FAILED:
            return {
                ...state,
                custom: {
                    ...state.custom,
                    error: action.payload,
                    loading: false,
                }
            }
        case CUSTOM_ORDER_SUCCESS:
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
        case DO_BATCH_REQUEST:
            return {
                ...state,
                batchRequest: {
                    ...state.batchRequest,
                    conditionals: action.conditionals,
                    doRequest: true
                }
            }
        case PRINT_BATCH_REQUEST:
            return {
                ...state,
                batchRequest: {
                    ...state.batchRequest,
                    conditionals: action.conditionals,
                    doRequest: false,
                    loading: true
                }
            }
        case PRINT_BATCH_REQUEST_SUCCESS:
            return {
                ...state,
                batchRequest: {
                    ...state.batchRequest,
                    meta: action.meta,
                    data: action.data,
                    loading: false
                }
            }
        case PRINT_BATCH_REQUEST_FAILED:
            return {
                ...state,
                batchRequest: {
                    ...state.batchRequest,
                    error: action.error,
                    loading: false
                }
            }
        case RESET_BATCH_REQUEST:
            return {
                ...state,
                batchRequest: {
                    ...state.batchRequest,
                    data: null,
                    meta: {},
                    error: null,
                    conditionals: null,
                    doRequest: false,
                    loading: false
                }
            }
        default:
            state = {...state}
            break
    }
    return state
}

export default order

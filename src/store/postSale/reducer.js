import {
    RESUME_POST_SALE,
    GET_POST_SALE,
    GET_POST_SALE_FAILED,
    GET_POST_SALE_SUCCESS,
    GET_POST_SALES,
    GET_POST_SALES_FAILED,
    GET_POST_SALES_SUCCESS,
    REGISTER_POST_SALE,
    REGISTER_POST_SALE_FAILED,
    REGISTER_POST_SALE_SUCCESS,
    UPDATE_POST_SALE, UPDATE_POST_SALE_FAILED,
    UPDATE_POST_SALE_SUCCESS, PRINT_POST_SALE, CUSTOM_POST_SALE_SUCCESS, CUSTOM_POST_SALE_FAILED, REFRESH_POST_SALE
} from "./actionTypes";

const initialState = {
    error: "",
    loading: false,
    meta: {},
    orders: [],
    order: {},
    refresh: null,
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
        batch: null,
        error: null,
        meta: {},
        conditionals: null,
        loading: false,
        doRequest: false
    }
}

const postSale = (state = initialState, action) => {
    switch (action.type) {
        case GET_POST_SALES:
            return {
                ...state,
                loading: true,
            }
        case GET_POST_SALES_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: true,
            }
        case GET_POST_SALES_SUCCESS:
            return {
                ...state,
                orders: action.payload,
                meta: action.meta,
                loading: false,
            }
        case GET_POST_SALE:
            return {
                ...state,
                loading: true,
            }
        case GET_POST_SALE_SUCCESS:
            return {
                ...state,
                order: action.payload,
                loading: false,
            }
        case GET_POST_SALE_FAILED:
            return {
                ...state,
                loading: false,
            }
        case REGISTER_POST_SALE:
            state = {
                ...state,
                loading: true,
            }
            break
        case REGISTER_POST_SALE_SUCCESS:
            state = {
                ...state,
                loading: false,
                order: action.payload
            }
            break
        case REGISTER_POST_SALE_FAILED:
            state = {
                ...state,
                loading: false,
            }
            break
        case UPDATE_POST_SALE:
            state = {
                ...state,
                loading: true,
            }
            break
        case UPDATE_POST_SALE_SUCCESS:
            state = {
                ...state,
                loading: false,
                order: action.payload
            }
            break
        case UPDATE_POST_SALE_FAILED:
            state = {
                ...state,
                loading: false,
            }
            break
        case RESUME_POST_SALE:
            return {
                ...state,
                custom:{
                    ...state.custom,
                    loading:true
                }
            }
        case PRINT_POST_SALE:
            return {
                ...state,
                custom:{
                    ...state.custom,
                    loading:true
                }
            }
        case CUSTOM_POST_SALE_FAILED:
            return {
                ...state,
                custom: {
                    ...state.custom,
                    error: action.payload,
                    loading: false,
                }
            }
        case CUSTOM_POST_SALE_SUCCESS:
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
        case REFRESH_POST_SALE:
            return {
                ...state,
                refresh: !state.refresh,
            }
        default:
            state = {...state}
            break
    }
    return state
}

export default postSale

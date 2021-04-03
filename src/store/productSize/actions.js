import {
    GET_PRODUCT_SIZES,
    GET_PRODUCT_SIZES_SUCCESS,
    GET_PRODUCT_SIZES_FAILED,
    GET_PRODUCT_SIZE,
    GET_PRODUCT_SIZE_SUCCESS,
    GET_PRODUCT_SIZE_FAILED,
    REGISTER_PRODUCT_SIZE,
    REGISTER_PRODUCT_SIZE_SUCCESS,
    REGISTER_PRODUCT_SIZE_FAILED,
    UPDATE_PRODUCT_SIZE,
    UPDATE_PRODUCT_SIZE_SUCCESS,
    UPDATE_PRODUCT_SIZE_FAILED,
    UPDATE_PRODUCT_SIZE_LIST_SUCCESS,
    UPDATE_PRODUCT_SIZE_LIST_FAILED,
    UPDATE_PRODUCT_SIZE_LIST,
} from "./actionTypes";

export const getProductSizes = (conditional, limit, offset) => ({
    type: GET_PRODUCT_SIZES,
    conditional: conditional,
    limit: limit,
    offset: offset
})

export const getProductSizesSuccess = (data, meta) => ({
    type: GET_PRODUCT_SIZES_SUCCESS,
    meta: meta,
    payload: data,
})

export const getProductSizesFailed = error => ({
    type: GET_PRODUCT_SIZES_FAILED,
    payload: error,
})

export const getProductSize = id => ({
    type: GET_PRODUCT_SIZE,
    id
})

export const getProductSizeSuccess = data => ({
    type: GET_PRODUCT_SIZE_SUCCESS,
    payload: data,
})

export const getProductSizeFailed = error => ({
    type: GET_PRODUCT_SIZE_FAILED,
    payload: error,
})

export const registerProductSize = (data, history) => {
    return {
        type: REGISTER_PRODUCT_SIZE,
        payload: { data, history },
    }
}

export const registerProductSizeSuccess = data => {
    return {
        type: REGISTER_PRODUCT_SIZE_SUCCESS,
        payload: data,
    }
}


export const registerProductSizeFailed = data => {
    return {
        type: REGISTER_PRODUCT_SIZE_FAILED,
        payload: data,
    }
}

export const updateProductSize = (id, data, history) => {
    return {
        type: UPDATE_PRODUCT_SIZE,
        payload: { id, data, history },
    }
}

export const updateProductSizeSuccess = data => {
    return {
        type: UPDATE_PRODUCT_SIZE_SUCCESS,
        payload: data,
    }
}


export const updateProductSizeFail = error => {
    return {
        type: UPDATE_PRODUCT_SIZE_FAILED,
        payload: error,
    }
}

export const updateProductSizeList = (id, data, history) => {
    return {
        type: UPDATE_PRODUCT_SIZE_LIST,
        payload: { id, data, history },
    }
}

export const updateProductSizeListSuccess = response => {
    return {
        type: UPDATE_PRODUCT_SIZE_LIST_SUCCESS,
        payload: response,
    }
}


export const updateProductSizeListFail = error => {
    return {
        type: UPDATE_PRODUCT_SIZE_LIST_FAILED,
        payload: error,
    }
}

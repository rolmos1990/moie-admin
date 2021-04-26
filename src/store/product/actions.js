import {
    GET_PRODUCTS,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAILED,
    GET_PRODUCT,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAILED,
    REGISTER_PRODUCT_FAILED,
    REGISTER_PRODUCT_SUCCESS,
    REGISTER_PRODUCT,
    UPDATE_PRODUCT_FAILED,
    UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT, RESET_PRODUCT
} from "./actionTypes";

export const resetProduct = () => ({
    type: RESET_PRODUCT,
})

export const getProducts = (conditional, limit, offset) => ({
    type: GET_PRODUCTS,
    conditional: conditional,
    limit: limit,
    offset: offset
})

export const getProductsSuccess = (data, meta) => ({
    type: GET_PRODUCTS_SUCCESS,
    meta: meta,
    payload: data,
})

export const getProductsFailed = error => ({
    type: GET_PRODUCTS_FAILED,
    payload: error,
})

export const getProduct = id => ({
    type: GET_PRODUCT,
    id
})

export const getProductSuccess = data => ({
    type: GET_PRODUCT_SUCCESS,
    payload: data,
})

export const getProductFailed = error => ({
    type: GET_PRODUCT_FAILED,
    payload: error,
})

export const registerProduct = (data, history) => {
    return {
        type: REGISTER_PRODUCT,
        payload: { data, history },
    }
}

export const registerProductSuccess = data => {
    return {
        type: REGISTER_PRODUCT_SUCCESS,
        payload: data.product,
    }
}


export const registerProductFailed = data => {
    return {
        type: REGISTER_PRODUCT_FAILED,
        payload: data,
    }
}

export const updateProduct = (id, data, history) => {
    return {
        type: UPDATE_PRODUCT,
        payload: { id, data, history },
    }
}

export const updateProductSuccess = data => {
    return {
        type: UPDATE_PRODUCT_SUCCESS,
        payload: data,
    }
}


export const updateProductFail = error => {
    return {
        type: UPDATE_PRODUCT_FAILED,
        payload: error,
    }
}

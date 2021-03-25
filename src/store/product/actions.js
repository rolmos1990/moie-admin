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
    UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT
} from "./actionTypes";

export const getProducts = (conditional, limit, offset) => ({
    type: GET_PRODUCTS,
    conditional: conditional,
    limit: limit,
    offset: offset
})

export const getProductsSuccess = (customers, meta) => ({
    type: GET_PRODUCTS_SUCCESS,
    meta: meta,
    payload: customers,
})

export const getProductsFailed = error => ({
    type: GET_PRODUCTS_FAILED,
    payload: error,
})

export const getProduct = id => ({
    type: GET_PRODUCT,
    id
})

export const getProductSuccess = product => ({
    type: GET_PRODUCT_SUCCESS,
    payload: product,
})

export const getProductFailed = error => ({
    type: GET_PRODUCT_FAILED,
    payload: error,
})

export const registerProduct = (product, history) => {
    return {
        type: REGISTER_PRODUCT,
        payload: { product, history },
    }
}

export const registerProductSuccess = product => {
    return {
        type: REGISTER_PRODUCT_SUCCESS,
        payload: product,
    }
}


export const registerProductFailed = product => {
    return {
        type: REGISTER_PRODUCT_FAILED,
        payload: product,
    }
}

export const updateProduct = (id, product, history) => {
    return {
        type: UPDATE_PRODUCT,
        payload: { id, product, history },
    }
}

export const updateProductSuccess = product => {
    return {
        type: UPDATE_PRODUCT_SUCCESS,
        payload: product,
    }
}


export const updateProductFail = error => {
    return {
        type: UPDATE_PRODUCT_FAILED,
        payload: error,
    }
}

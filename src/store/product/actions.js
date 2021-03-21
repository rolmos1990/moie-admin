import {
    GET_PRODUCTS,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAILED} from "./actionTypes";

export const getProducts = (conditional, limit, offset) => ({
    type: GET_PRODUCTS,
    conditional,
    limit,
    offset
})

export const getProductsSuccess = products => ({
    type: GET_PRODUCTS_SUCCESS,
    payload: products,
})

export const getProductsFailed = error => ({
    type: GET_PRODUCTS_FAILED,
    payload: error,
})

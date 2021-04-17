import {
    UPDATE_PRODUCT_SIZE_LIST_SUCCESS,
    UPDATE_PRODUCT_SIZE_LIST_FAILED,
    UPDATE_PRODUCT_SIZE_LIST,
} from "./actionTypes";

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

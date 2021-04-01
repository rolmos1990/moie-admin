import {
    GET_CATEGORIES,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAILED,
    GET_CATEGORY,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_FAILED,
    REGISTER_CATEGORY,
    REGISTER_CATEGORY_SUCCESS,
    REGISTER_CATEGORY_FAILED,
    UPDATE_CATEGORY,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAILED,
} from "./actionTypes";

export const getCategories = (conditional, limit, offset) => ({
    type: GET_CATEGORIES,
    conditional: conditional,
    limit: limit,
    offset: offset
})

export const getCategoriesSuccess = (data, meta) => ({
    type: GET_CATEGORIES_SUCCESS,
    meta: meta,
    payload: data,
})

export const getCategoriesFailed = error => ({
    type: GET_CATEGORIES_FAILED,
    payload: error,
})

export const getCategory = id => ({
    type: GET_CATEGORY,
    id
})

export const getCategorySuccess = data => ({
    type: GET_CATEGORY_SUCCESS,
    payload: data,
})

export const getCategoryFailed = error => ({
    type: GET_CATEGORY_FAILED,
    payload: error,
})

export const registerCategory = (data, history) => {
    return {
        type: REGISTER_CATEGORY,
        payload: { data, history },
    }
}

export const registerCategorySuccess = data => {
    return {
        type: REGISTER_CATEGORY_SUCCESS,
        payload: data,
    }
}


export const registerCategoryFailed = data => {
    return {
        type: REGISTER_CATEGORY_FAILED,
        payload: data,
    }
}

export const updateCategory = (id, data, history) => {
    return {
        type: UPDATE_CATEGORY,
        payload: { id, data, history },
    }
}

export const updateCategorySuccess = data => {
    return {
        type: UPDATE_CATEGORY_SUCCESS,
        payload: data,
    }
}


export const updateCategoryFail = error => {
    return {
        type: UPDATE_CATEGORY_FAILED,
        payload: error,
    }
}

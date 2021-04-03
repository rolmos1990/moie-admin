import {
    GET_FIELD_OPTIONS,
    GET_FIELD_OPTIONS_SUCCESS,
    GET_FIELD_OPTIONS_FAILED,
    GET_FIELD_OPTION,
    GET_FIELD_OPTION_SUCCESS,
    GET_FIELD_OPTION_FAILED,
    REGISTER_FIELD_OPTION,
    REGISTER_FIELD_OPTION_SUCCESS,
    REGISTER_FIELD_OPTION_FAILED,
    UPDATE_FIELD_OPTION,
    UPDATE_FIELD_OPTION_SUCCESS,
    UPDATE_FIELD_OPTION_FAILED,
} from "./actionTypes";

export const getFieldOptions = (conditional, limit, offset) => ({
    type: GET_FIELD_OPTIONS,
    conditional: conditional,
    limit: limit,
    offset: offset
})

export const getFieldOptionsSuccess = (data, meta) => ({
    type: GET_FIELD_OPTIONS_SUCCESS,
    meta: meta,
    payload: data,
})

export const getFieldOptionsFailed = error => ({
    type: GET_FIELD_OPTIONS_FAILED,
    payload: error,
})

export const getFieldOption = id => ({
    type: GET_FIELD_OPTION,
    id
})

export const getFieldOptionSuccess = data => ({
    type: GET_FIELD_OPTION_SUCCESS,
    payload: data,
})

export const getFieldOptionFailed = error => ({
    type: GET_FIELD_OPTION_FAILED,
    payload: error,
})

export const registerFieldOption = (data, history) => {
    return {
        type: REGISTER_FIELD_OPTION,
        payload: { data, history },
    }
}

export const registerFieldOptionSuccess = data => {
    return {
        type: REGISTER_FIELD_OPTION_SUCCESS,
        payload: data,
    }
}


export const registerFieldOptionFailed = data => {
    return {
        type: REGISTER_FIELD_OPTION_FAILED,
        payload: data,
    }
}

export const updateFieldOption = (id, data, history) => {
    return {
        type: UPDATE_FIELD_OPTION,
        payload: { id, data, history },
    }
}

export const updateFieldOptionSuccess = data => {
    return {
        type: UPDATE_FIELD_OPTION_SUCCESS,
        payload: data,
    }
}


export const updateFieldOptionFail = error => {
    return {
        type: UPDATE_FIELD_OPTION_FAILED,
        payload: error,
    }
}

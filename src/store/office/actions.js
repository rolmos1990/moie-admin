import {
    GET_OFFICES,
    GET_OFFICES_SUCCESS,
    GET_OFFICES_FAILED,
    GET_OFFICE,
    GET_OFFICE_SUCCESS,
    GET_OFFICE_FAILED,
    REGISTER_OFFICE_FAILED,
    REGISTER_OFFICE_SUCCESS,
    REGISTER_OFFICE,
    UPDATE_OFFICE_FAILED,
    UPDATE_OFFICE_SUCCESS,
    UPDATE_OFFICE,
    RESET_OFFICE,
    QUERY_OFFICES,
    QUERY_OFFICES_FAILED,
    QUERY_OFFICES_SUCCESS,
    DELETE_OFFICE,
    DELETE_OFFICE_FAILED,
    DELETE_OFFICE_SUCCESS,
    CONFIRM_OFFICE,
    CONFIRM_OFFICE_SUCCESS,
    CONFIRM_OFFICE_FAILED
} from "./actionTypes";
import Conditionals from "../../common/conditionals";

export const resetOffice = () => ({
    type: RESET_OFFICE,
})

export const getOffices = (conditional, limit, offset) => ({
    type: GET_OFFICES,
    conditional: conditional,
    limit: limit,
    offset: offset
})



export const getOfficesByIds = (ids, offset) => {
    const conditions = new Conditionals.Condition;
    if(ids.length > 0) conditions.add("id", ids.join("::"), Conditionals.OPERATORS.IN);
    return getOffices(conditions.all(), ids.length, offset);
}

export const getOfficesSuccess = (data, meta) => ({
    type: GET_OFFICES_SUCCESS,
    meta: meta,
    payload: data,
})

export const getOfficesFailed = error => ({
    type: GET_OFFICES_FAILED,
    payload: error,
})

export const getOffice = id => ({
    type: GET_OFFICE,
    id
})

export const getOfficeSuccess = data => ({
    type: GET_OFFICE_SUCCESS,
    payload: data,
})

export const getOfficeFailed = error => ({
    type: GET_OFFICE_FAILED,
    payload: error,
})

export const registerOffice = (data, history) => {
    return {
        type: REGISTER_OFFICE,
        payload: { data, history },
    }
}

export const registerOfficeSuccess = data => {
    return {
        type: REGISTER_OFFICE_SUCCESS,
        payload: data.office,
    }
}


export const registerOfficeFailed = data => {
    return {
        type: REGISTER_OFFICE_FAILED,
        payload: data,
    }
}

export const updateOffice = (id, data, history) => {
    return {
        type: UPDATE_OFFICE,
        payload: { id, data, history },
    }
}

export const updateOfficeSuccess = data => {
    return {
        type: UPDATE_OFFICE_SUCCESS,
        payload: data,
    }
}


export const updateOfficeFail = error => {
    return {
        type: UPDATE_OFFICE_FAILED,
        payload: error,
    }
}

export const deleteOffice = (id, history) => ({
    type: DELETE_OFFICE,
    payload: { id, history}
})

export const deleteOfficeSuccess = () => ({
    type: DELETE_OFFICE_SUCCESS
})

export const deleteOfficeFailed = error => ({
    type: DELETE_OFFICE_FAILED,
    payload: error,
})

export const confirmOffice = (id, history) => ({
    type: CONFIRM_OFFICE,
    payload: { id, history}
})

export const confirmOfficeSuccess = () => ({
    type: CONFIRM_OFFICE_SUCCESS
})

export const confirmOfficeFailed = error => ({
    type: CONFIRM_OFFICE_FAILED,
    payload: error,
})



export const countOfficeByStatus = () => {
    const params = {operation:'id::count', group:"status"};
    return queryOffices(params, 'statusGroup');
}

export const queryOffices = (params, node) => ({
    type: QUERY_OFFICES,
    params: params,
    node: node,
})
export const queryOfficesFailed = error => ({
    type: QUERY_OFFICES_FAILED,
    payload: error,
})
export const queryOfficesSuccess = (data, meta, node) => ({
    type: QUERY_OFFICES_SUCCESS,
    meta: meta,
    payload: data,
    node: node,
})

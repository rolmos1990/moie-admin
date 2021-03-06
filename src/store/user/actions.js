import {
    GET_USERS,
    GET_USERS_SUCCESS,
    GET_USERS_FAILED,
    GET_USER,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED, CHANGE_PASSWORD_FAILED, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD, RESET_CHANGE_PASSWORD, USER_CHANGE_PASSWORD,
} from "./actionTypes";

export const getUsers = (conditional, limit, offset) => ({
    type: GET_USERS,
    conditional: conditional,
    limit: limit,
    offset: offset
})

export const getUsersSuccess = (data, meta) => ({
    type: GET_USERS_SUCCESS,
    meta: meta,
    payload: data,
})

export const getUsersFailed = error => ({
    type: GET_USERS_FAILED,
    payload: error,
})

export const getUser = id => ({
    type: GET_USER,
    id
})

export const getUserSuccess = data => ({
    type: GET_USER_SUCCESS,
    payload: data,
})

export const getUserFailed = error => ({
    type: GET_USER_FAILED,
    payload: error,
})

export const registerUser = (data, history) => {
    return {
        type: REGISTER_USER,
        payload: { data, history },
    }
}

export const registerUserSuccess = data => {
    return {
        type: REGISTER_USER_SUCCESS,
        payload: data,
    }
}


export const registerUserFailed = data => {
    return {
        type: REGISTER_USER_FAILED,
        payload: data,
    }
}

export const updateUser = (id, data, history) => {
    return {
        type: UPDATE_USER,
        payload: { id, data, history },
    }
}

export const updateUserSuccess = data => {
    return {
        type: UPDATE_USER_SUCCESS,
        payload: data,
    }
}


export const updateUserFail = error => {
    return {
        type: UPDATE_USER_FAILED,
        payload: error,
    }
}

//CHANGE PASSWORD
export const resetPasswordState = () => {
    return {
        type: RESET_CHANGE_PASSWORD
    }
}
export const setUserToChangePassword = (user) => {
    return {
        type: USER_CHANGE_PASSWORD,
        user:  user ,
    }
}
export const changePassword = (data) => {
    return {
        type: CHANGE_PASSWORD,
        payload:  data ,
    }
}
export const changePasswordSuccess = data => {
    return {
        type: CHANGE_PASSWORD_SUCCESS,
        success: true,
    }
}
export const changePasswordFailed = error => {
    return {
        type: CHANGE_PASSWORD_FAILED,
        error: error,
    }
}

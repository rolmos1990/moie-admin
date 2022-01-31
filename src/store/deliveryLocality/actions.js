import {
    GET_DELIVERY_LOCALITIES,
    GET_DELIVERY_LOCALITIES_SUCCESS,
    GET_DELIVERY_LOCALITIES_FAILED,
    GET_DELIVERY_LOCALITY,
    GET_DELIVERY_LOCALITY_SUCCESS,
    GET_DELIVERY_LOCALITY_FAILED,
    REGISTER_DELIVERY_LOCALITY,
    REGISTER_DELIVERY_LOCALITY_SUCCESS,
    REGISTER_DELIVERY_LOCALITY_FAILED,
    UPDATE_DELIVERY_LOCALITY,
    UPDATE_DELIVERY_LOCALITY_SUCCESS,
    UPDATE_DELIVERY_LOCALITY_FAILED,
} from "./actionTypes";

export const getAllDeliveryLocalities = () => {
    return getDeliveryLocalities(null, 1200, 0);
}

export const getDeliveryLocalities = (conditional, limit, offset) => ({
    type: GET_DELIVERY_LOCALITIES,
    conditional: conditional,
    limit: limit,
    offset: offset
})

export const getDeliveryLocalitiesSuccess = (data, meta) => ({
    type: GET_DELIVERY_LOCALITIES_SUCCESS,
    meta: meta,
    payload: data,
})

export const getDeliveryLocalitiesFailed = error => ({
    type: GET_DELIVERY_LOCALITIES_FAILED,
    payload: error,
})

export const getDeliveryLocality = id => ({
    type: GET_DELIVERY_LOCALITY,
    id
})

export const getDeliveryLocalitySuccess = data => ({
    type: GET_DELIVERY_LOCALITY_SUCCESS,
    payload: data,
})

export const getDeliveryLocalityFailed = error => ({
    type: GET_DELIVERY_LOCALITY_FAILED,
    payload: error,
})

export const registerDeliveryLocality = (data, history) => {
    return {
        type: REGISTER_DELIVERY_LOCALITY,
        payload: { data, history },
    }
}

export const registerDeliveryLocalitySuccess = data => {
    return {
        type: REGISTER_DELIVERY_LOCALITY_SUCCESS,
        payload: data,
    }
}


export const registerDeliveryLocalityFailed = data => {
    return {
        type: REGISTER_DELIVERY_LOCALITY_FAILED,
        payload: data,
    }
}

export const updateDeliveryLocality = (id, data, history) => {
    return {
        type: UPDATE_DELIVERY_LOCALITY,
        payload: { id, data, history },
    }
}

export const updateDeliveryLocalitySuccess = data => {
    return {
        type: UPDATE_DELIVERY_LOCALITY_SUCCESS,
        payload: data,
    }
}


export const updateDeliveryLocalityFail = error => {
    return {
        type: UPDATE_DELIVERY_LOCALITY_FAILED,
        payload: error,
    }
}

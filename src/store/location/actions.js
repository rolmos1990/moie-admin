import {
    GET_STATES,
    GET_STATES_SUCCESS,
    GET_STATES_FAILED,
    GET_MUNICIPALITIES,
    GET_MUNICIPALITIES_SUCCESS,
    GET_MUNICIPALITIES_FAILED} from "./actionTypes";

export const getStates = (conditional, limit, offset) => ({
    type: GET_STATES,
    conditional,
    limit,
    offset
})

export const getStatesSuccess = states => ({
    type: GET_STATES_SUCCESS,
    payload: states,
})

export const getStatesFailed = error => ({
    type: GET_STATES_FAILED,
    payload: error,
})

export const getMunicipalities = (conditional, limit, offset) => ({
    type: GET_MUNICIPALITIES,
    conditional,
    limit,
    offset
})

export const getMunicipalitiesSuccess = states => ({
    type: GET_MUNICIPALITIES_SUCCESS,
    payload: states,
})

export const getMunicipalitiesFailed = error => ({
    type: GET_MUNICIPALITIES_FAILED,
    payload: error,
})

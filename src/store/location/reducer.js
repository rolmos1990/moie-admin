import {
    GET_MUNICIPALITIES,
    GET_MUNICIPALITIES_SUCCESS,
    GET_MUNICIPALITIES_FAILED,
    GET_STATES,
    GET_STATES_SUCCESS,
    GET_STATES_FAILED
} from "./actionTypes"

const initialState = {
    error: "",
    loading: false,
    municipalities: [],
    municipality:{},
    states: [],
    state:{}
}

const location = (state = initialState, action) => {
    switch (action.type) {
        case GET_MUNICIPALITIES:
            return {
                ...state,
                loading: true,
            }
        case GET_MUNICIPALITIES_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: false,
            }

        case GET_MUNICIPALITIES_SUCCESS:
            return {
                ...state,
                municipalities: action.payload,
                loading: false,
            }
        case GET_STATES:
            return {
                ...state,
                loading: true,
            }
        case GET_STATES_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: false,
            }

        case GET_STATES_SUCCESS:
            return {
                ...state,
                states: action.payload,
                loading: false,
            }
        default:
            state = { ...state }
            break
    }
    return state
}

export default location

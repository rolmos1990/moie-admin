import {GENERATE_REPORT, GENERATE_REPORT_FAILED, GENERATE_REPORT_RESTART, GENERATE_REPORT_SUCCESS} from "./actionTypes";

const initialState = {
    error: "",
    loading: false
}

const report = (state = initialState, action) => {
    switch (action.type) {
        case GENERATE_REPORT:
            return {
                ...state,
                loading: true,
            }
        case GENERATE_REPORT_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
            }
        case GENERATE_REPORT_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        case GENERATE_REPORT_RESTART:
            return {
                ...state,
                error: null,
                loading: false,
            }
        default:
            state = {...state}
            break
    }
    return state
}

export default report

import {
    GET_BILLS,
    GET_BILLS_SUCCESS,
    GET_BILLS_FAILED,
    GET_BILL,
    GET_BILL_SUCCESS,
    GET_BILL_FAILED,
    REGISTER_BILL_FAILED,
    REGISTER_BILL_SUCCESS,
    REGISTER_BILL,
    UPDATE_BILL_FAILED,
    UPDATE_BILL_SUCCESS,
    UPDATE_BILL,
    RESET_BILL,
    QUERY_BILLS,
    QUERY_BILLS_FAILED,
    QUERY_BILLS_SUCCESS,
    DELETE_BILL,
    DELETE_BILL_FAILED,
    DELETE_BILL_SUCCESS,
    CONFIRM_BILL,
    CONFIRM_BILL_SUCCESS,
    CONFIRM_BILL_FAILED, ADD_ORDER_BILL, ADD_ORDER_BILL_SUCCESS, ADD_ORDER_BILL_FAILED
} from "./actionTypes";
import Conditionals from "../../common/conditionals";

export const resetBill = () => ({
    type: RESET_BILL,
})

export const getBills = (conditional, limit, offset) => ({
    type: GET_BILLS,
    conditional: conditional,
    limit: limit,
    offset: offset
})



export const getBillsByIds = (ids, offset) => {
    const conditions = new Conditionals.Condition;
    if(ids.length > 0) conditions.add("id", ids.join("::"), Conditionals.OPERATORS.IN);
    return getBills(conditions.all(), ids.length, offset);
}

export const getBillsSuccess = (data, meta) => ({
    type: GET_BILLS_SUCCESS,
    meta: meta,
    payload: data,
})

export const getBillsFailed = error => ({
    type: GET_BILLS_FAILED,
    payload: error,
})

export const getBill = id => ({
    type: GET_BILL,
    id
})

export const getBillSuccess = data => ({
    type: GET_BILL_SUCCESS,
    payload: data,
})

export const getBillFailed = error => ({
    type: GET_BILL_FAILED,
    payload: error,
})

export const registerBill = (data, history) => {
    return {
        type: REGISTER_BILL,
        payload: { data, history },
    }
}

export const registerBillSuccess = data => {
    return {
        type: REGISTER_BILL_SUCCESS,
        payload: data.bill,
    }
}


export const registerBillFailed = data => {
    return {
        type: REGISTER_BILL_FAILED,
        payload: data,
    }
}

export const updateBill = (id, data, history) => {
    return {
        type: UPDATE_BILL,
        payload: { id, data, history },
    }
}

export const updateBillSuccess = data => {
    return {
        type: UPDATE_BILL_SUCCESS,
        payload: data,
    }
}


export const updateBillFail = error => {
    return {
        type: UPDATE_BILL_FAILED,
        payload: error,
    }
}

export const deleteBill = (id, history) => ({
    type: DELETE_BILL,
    payload: { id, history}
})

export const deleteBillSuccess = () => ({
    type: DELETE_BILL_SUCCESS
})

export const deleteBillFailed = error => ({
    type: DELETE_BILL_FAILED,
    payload: error,
})

export const confirmBill = (id, history) => ({
    type: CONFIRM_BILL,
    payload: { id, history}
})

export const confirmBillSuccess = () => ({
    type: CONFIRM_BILL_SUCCESS
})

export const confirmBillFailed = error => ({
    type: CONFIRM_BILL_FAILED,
    payload: error,
})



export const countBillByStatus = () => {
    const params = {operation:'id::count', group:"status"};
    return queryBills(params, 'statusGroup');
}

export const queryBills = (params, node) => ({
    type: QUERY_BILLS,
    params: params,
    node: node,
})
export const queryBillsFailed = error => ({
    type: QUERY_BILLS_FAILED,
    payload: error,
})
export const queryBillsSuccess = (data, meta, node) => ({
    type: QUERY_BILLS_SUCCESS,
    meta: meta,
    payload: data,
    node: node,
})

export const addOrderBill = (id, data, conditional, history) => {
    return {
        type: ADD_ORDER_BILL,
        payload: { id, data, conditional, history },
    }
}

export const addOrderBillSuccess = data => {
    return {
        type: ADD_ORDER_BILL_SUCCESS,
        payload: data.bill,
    }
}


export const addOrderBillFailed = data => {
    return {
        type: ADD_ORDER_BILL_FAILED,
        payload: data,
    }
}

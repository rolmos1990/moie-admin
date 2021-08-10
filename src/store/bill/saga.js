import {all, call, fork, put, takeEvery} from "redux-saga/effects"

//Account Redux states
import {
    GET_BILLS,
    GET_BILL,
    REGISTER_BILL,
    UPDATE_BILL,
    QUERY_BILLS,
    DELETE_BILL,
    CONFIRM_BILL, ADD_ORDER_BILL
} from "./actionTypes"

import {
    getBillsSuccess,
    getBillsFailed,
    registerBillSuccess,
    getBillSuccess,
    getBillFailed,
    registerBillFailed,
    updateBillSuccess,
    updateBillFail, queryBillsSuccess, queryBillsFailed,
    deleteBillFailed, deleteBillSuccess, confirmBillSuccess
} from "./actions"

import {
    registerBillApi,
    updateBillApi,
    fetchBillApi,
    fetchBillsApi, deleteBillApi, confirmBillApi, addOrderBillApi
} from "../../helpers/backend_helper"

import Conditionals from "../../common/conditionals";
import {showResponseMessage} from "../../helpers/service";

/**
 * *  Configuración de CRUD Saga (Realizar configuración para cada uno de las replicas)
*/

const ACTION_NAME_QUERY      =   QUERY_BILLS;
const ACTION_NAME_LIST      =    GET_BILLS;
const ACTION_NAME_GET       =    GET_BILL;
const ACTION_NAME_CREATE    =    REGISTER_BILL;
const ACTION_NAME_UPDATE    =    UPDATE_BILL;
const ACTION_NAME_DELETE    =    DELETE_BILL;
const ACTION_NAME_CONFIRM   =    CONFIRM_BILL;
const ACTION_NAME_ADD_CHILD =    ADD_ORDER_BILL;

const LIST_API_REQUEST      =   fetchBillsApi;
const GET_API_REQUEST       =   fetchBillApi;
const POST_API_REQUEST      =   registerBillApi;
const PUT_API_REQUEST       =   updateBillApi;

//actions
const QUERY_SUCCESS_ACTION  =   queryBillsSuccess;
const QUERY_FAILED_ACTION   =   queryBillsFailed;
const LIST_SUCCESS_ACTION   =   getBillsSuccess;
const LIST_FAILED_ACTION    =   getBillsFailed;
const GET_SUCCESS_ACTION    =   getBillSuccess;
const GET_FAILED_ACTION     =   getBillFailed;
const CREATE_SUCCESS_ACTION =   registerBillSuccess;
const CREATE_FAILED_ACTION  =   registerBillFailed;
const UPDATE_SUCCESS_ACTION =   updateBillSuccess;
const UPDATE_FAILED_ACTION  =   updateBillFail;


const LIST_URL = "/bills";
const SHOW_URL = "/bill";

function* get({ id }) {
    try {
        const response = yield call(GET_API_REQUEST, { id });
        yield put(GET_SUCCESS_ACTION(response))
    } catch (error) {
        yield put(GET_FAILED_ACTION(error))
    }
}


function* fetch({conditional, limit, offset}) {
    try {
        const cond = Conditionals.getConditionalFormat(conditional);
        const query = Conditionals.buildHttpGetQuery(cond, limit, offset);
        const response = yield call(LIST_API_REQUEST, query)
        yield put(LIST_SUCCESS_ACTION(response.data, response.meta));
    } catch (error) {
        yield put(LIST_FAILED_ACTION(error))
    }
}
function* queryData({params ={}, node='bills'}) {
    try {
        const response = yield call(LIST_API_REQUEST, params)
        yield put(QUERY_SUCCESS_ACTION(response.data, response.meta, node));
    } catch (error) {
        yield put(QUERY_FAILED_ACTION(error))
    }
}

function* register({ payload: { data, history } }) {
    try {
        const response = yield call(POST_API_REQUEST, data)
        showResponseMessage(response, "Despacho creado!");
        yield put(CREATE_SUCCESS_ACTION(response))
       history.push(SHOW_URL + "/" + response.bill.id);
    } catch (error) {
        yield put(CREATE_FAILED_ACTION(error))
    }
}

function* update({ payload: { id, data, history } }) {
    try {
        const response = yield call(PUT_API_REQUEST, id, data)
        showResponseMessage(response, "Despacho actualizado!")
        yield put(UPDATE_SUCCESS_ACTION(response))
        //history.push(LIST_URL)
    } catch (error) {
        yield put(UPDATE_FAILED_ACTION(error))
    }
}

function* billDelete({ payload: { id, history } }) {
    try {
        yield call(deleteBillApi, id)
        yield put(deleteBillSuccess(id))
        showResponseMessage({status:200}, "Despacho borrado!");
        history.push("/bills")

    } catch (error) {
        console.log("error", error);
        yield put(deleteBillFailed(error))
    }
}

function* billConfirm({ payload: { id, history } }) {
    try {
        yield call(confirmBillApi, id)
        yield put(confirmBillSuccess(id))
        showResponseMessage({status:200}, "Despacho ha sido finalizado!");
        history.push("/bills")

    } catch (error) {
        console.log("error", error);
        yield put(deleteBillFailed(error))
    }
}

function* billOrderAdd({ payload: { id, data, conditional, history } }) {
    try {
        const cond = Conditionals.getConditionalFormat(conditional);
        const query = Conditionals.buildHttpGetQuery(cond, 0, 200);
        yield call(addOrderBillApi, id, data, query)
        yield put(deleteBillSuccess(id))
        showResponseMessage({status:200}, "Despacho borrado!");
        history.push("/bill/" + id)

    } catch (error) {
        console.log("error", error);
        yield put(deleteBillFailed(error))
    }
}

export function* watchBill() {
    yield takeEvery(ACTION_NAME_CREATE, register);
    yield takeEvery(ACTION_NAME_UPDATE, update);
    yield takeEvery(ACTION_NAME_LIST, fetch);
    yield takeEvery(ACTION_NAME_GET, get);
    yield takeEvery(ACTION_NAME_DELETE, billDelete);
    yield takeEvery(ACTION_NAME_CONFIRM, billConfirm);
    yield takeEvery(ACTION_NAME_QUERY, queryData);
    yield takeEvery(ACTION_NAME_ADD_CHILD, billOrderAdd);
}

function* billSaga() {
    yield all([fork(watchBill)])
}

export default billSaga

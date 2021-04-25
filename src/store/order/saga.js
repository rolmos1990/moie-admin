import {all, call, fork, put, takeEvery} from "redux-saga/effects"

//Account Redux states
import {GET_ORDERS, GET_ORDER, REGISTER_ORDER, UPDATE_ORDER} from "./actionTypes"

import {
    getOrdersSuccess,
    getOrdersFailed,
    registerOrderSuccess,
    getOrderSuccess,
    getOrderFailed,
    registerOrderFailed,
    updateOrderSuccess,
    updateOrderFail
} from "./actions"

import {
    registerOrderApi,
    updateOrderApi,
    fetchOrderApi,
    fetchOrdersApi
} from "../../helpers/backend_helper"

import Conditionals from "../../common/conditionals";
import {showResponseMessage} from "../../helpers/service";

/**
 * *  Configuración de CRUD Saga (Realizar configuración para cada uno de las replicas)
 */

const ACTION_NAME_LIST      =   GET_ORDERS;
const ACTION_NAME_GET       =   GET_ORDER;
const ACTION_NAME_CREATE    =   REGISTER_ORDER;
const ACTION_NAME_UPDATE    =   UPDATE_ORDER;

const LIST_API_REQUEST      =   fetchOrdersApi;
const GET_API_REQUEST       =   fetchOrderApi;
const POST_API_REQUEST      =   registerOrderApi;
const PUT_API_REQUEST       =   updateOrderApi;

//actions
const LIST_SUCCESS_ACTION   =   getOrdersSuccess;
const LIST_FAILED_ACTION    =   getOrdersFailed;
const GET_SUCCESS_ACTION    =   getOrderSuccess;
const GET_FAILED_ACTION     =   getOrderFailed;
const CREATE_SUCCESS_ACTION =   registerOrderSuccess;
const CREATE_FAILED_ACTION  =   registerOrderFailed;
const UPDATE_SUCCESS_ACTION =   updateOrderSuccess;
const UPDATE_FAILED_ACTION  =   updateOrderFail;

function* get({ id }) {
    try {
        const response = yield call(GET_API_REQUEST,  id );
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

function* register({ payload: { data, history } }) {
    try {
        const response = yield call(POST_API_REQUEST, data)
        showResponseMessage(response, "Pedido creado!");
        yield put(CREATE_SUCCESS_ACTION(response))
    } catch (error) {
        yield put(CREATE_FAILED_ACTION(error))
    }
}

function* update({ payload: { id, data, history } }) {
    try {
        const response = yield call(PUT_API_REQUEST, id, data)
        showResponseMessage(response, "Pedido actualizado!");
        yield put(UPDATE_SUCCESS_ACTION(response))
    } catch (error) {
        yield put(UPDATE_FAILED_ACTION(error))
    }
}

export function* watchOrder() {
    yield takeEvery(ACTION_NAME_CREATE, register);
    yield takeEvery(ACTION_NAME_UPDATE, update);
    yield takeEvery(ACTION_NAME_LIST, fetch);
    yield takeEvery(ACTION_NAME_GET, get)
}

function* orderSaga() {
    yield all([fork(watchOrder)])
}

export default orderSaga;

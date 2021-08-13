import {all, call, fork, put, takeEvery, select} from "redux-saga/effects"

//Account Redux states
import {GET_POST_SALES, GET_POST_SALE, REGISTER_POST_SALE, UPDATE_POST_SALE, NEXT_STATUS_POST_SALE, RESUME_POST_SALE, PRINT_POST_SALE} from "./actionTypes"

import {
    getOrdersSuccess,
    getOrdersFailed,
    registerOrderSuccess,
    getOrderSuccess,
    getOrderFailed,
    registerOrderFailed,
    updateOrderSuccess,
    updateOrderFail,
    customOrderSuccess,
    customOrderFailed,
     refreshOrders
} from "./actions"

import {
    registerOrderApi,
    updateOrderApi,
    fetchOrderApi,
    fetchOrdersApi, fetchDeliveryMethodsApi, fetchDeliveryQuoteApi, nextStatusOrderApi, printOrderApi, resumeOrderApi, batchPrintRequestApi
} from "../../helpers/backend_helper"

import Conditionals from "../../common/conditionals";
import {showResponseMessage} from "../../helpers/service";

/**
 * *  Configuración de CRUD Saga (Realizar configuración para cada uno de las replicas)
 */

const ACTION_NAME_LIST = GET_POST_SALES;
const ACTION_NAME_GET = GET_POST_SALE;
const ACTION_NAME_CREATE = REGISTER_POST_SALE;
const ACTION_NAME_UPDATE = UPDATE_POST_SALE;

const PRINT_POST_SALE_API = printOrderApi;
const RESUME_POST_SALE_API = resumeOrderApi;
const LIST_API_REQUEST = fetchOrdersApi;
const NEXT_STATUS_API_REQUEST = nextStatusOrderApi;
const GET_API_REQUEST = fetchOrderApi;
const POST_API_REQUEST = registerOrderApi;
const PUT_API_REQUEST = updateOrderApi;

//actions
const CUSTOM_SUCCESS_ACTION = customOrderSuccess;
const CUSTOM_FAILED_ACTION = customOrderFailed;
const LIST_SUCCESS_ACTION = getOrdersSuccess;
const LIST_FAILED_ACTION = getOrdersFailed;
const GET_SUCCESS_ACTION = getOrderSuccess;
const GET_FAILED_ACTION = getOrderFailed;
const CREATE_SUCCESS_ACTION = registerOrderSuccess;
const CREATE_FAILED_ACTION = registerOrderFailed;
const UPDATE_SUCCESS_ACTION = updateOrderSuccess;
const UPDATE_FAILED_ACTION = updateOrderFail;

function* get({id}) {
    try {
        const response = yield call(GET_API_REQUEST, id);
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

function* register({payload: {data, history}}) {
    try {
        const response = yield call(POST_API_REQUEST, data)
        showResponseMessage(response, "Pedido creado!");
        if (response && response.order) {
            history.push("/order/" + response.order.id)
        }
        yield put(CREATE_SUCCESS_ACTION(response))
    } catch (error) {
        yield put(CREATE_FAILED_ACTION(error))
    }
}

function* nextStatus({payload: {data, history}}) {
    try {
        const response = yield call(NEXT_STATUS_API_REQUEST, data)
        if(response.status === 200) yield put(refreshOrders());
        showResponseMessage(response, "Operación exitosa!");
        yield put(UPDATE_SUCCESS_ACTION(response.order))
    } catch (error) {
        yield put(UPDATE_FAILED_ACTION(error))
    }
}

function* printOrder({payload: {id, history}}) {
    try {
        const response = yield call(PRINT_POST_SALE_API, id)
        yield put(CUSTOM_SUCCESS_ACTION(response.html, "print"))
    } catch (error) {
        yield put(CUSTOM_FAILED_ACTION(error))
    }
}

function* resumeOrder({payload: {id, history}}) {
    try {
        const response = yield call(RESUME_POST_SALE_API, id)
        yield put(CUSTOM_SUCCESS_ACTION(response.text, "resume"))
    } catch (error) {
        yield put(CUSTOM_FAILED_ACTION(error))
    }
}

function* update({payload: {id, data, history}}) {
    try {
        const response = yield call(PUT_API_REQUEST, id, data)
        showResponseMessage(response, "Pedido actualizado!");
        yield put(UPDATE_SUCCESS_ACTION(response.order))
    } catch (error) {
        yield put(UPDATE_FAILED_ACTION(error))
    }
}

export function* watchOrder() {
    yield takeEvery(ACTION_NAME_CREATE, register);
    yield takeEvery(ACTION_NAME_UPDATE, update);
    yield takeEvery(ACTION_NAME_LIST, fetch);
    yield takeEvery(ACTION_NAME_GET, get)
    yield takeEvery(NEXT_STATUS_POST_SALE, nextStatus)
    yield takeEvery(RESUME_POST_SALE, resumeOrder)
    yield takeEvery(PRINT_POST_SALE, printOrder)
}

function* postSaleSaga() {
    yield all([fork(watchOrder)])
}

export default postSaleSaga;

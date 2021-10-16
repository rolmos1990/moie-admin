import {all, call, fork, put, takeEvery} from "redux-saga/effects"

//Account Redux states
import {GET_PAYMENT, GET_PAYMENTS, REGISTER_PAYMENT, UPDATE_PAYMENT} from "./actionTypes"

import {getPaymentFailed, getPaymentsFailed, getPaymentsSuccess, getPaymentSuccess, registerPaymentFailed, registerPaymentSuccess, updatePaymentFail, updatePaymentSuccess} from "./actions"

import {fetchPaymentApi, fetchPaymentsApi, registerPaymentApi, updatePaymentApi} from "../../helpers/backend_helper"

import Conditionals from "../../common/conditionals";
import {showResponseMessage} from "../../helpers/service";

/**
 * *  Configuración de CRUD Saga (Realizar configuración para cada uno de las replicas)
 */

const ACTION_NAME_LIST = GET_PAYMENTS;
const ACTION_NAME_GET = GET_PAYMENT;
const ACTION_NAME_CREATE = REGISTER_PAYMENT;
const ACTION_NAME_UPDATE = UPDATE_PAYMENT;

const LIST_API_REQUEST = fetchPaymentsApi;
const GET_API_REQUEST = fetchPaymentApi;
const POST_API_REQUEST = registerPaymentApi;
const PUT_API_REQUEST = updatePaymentApi;

//actions
const LIST_SUCCESS_ACTION = getPaymentsSuccess;
const LIST_FAILED_ACTION = getPaymentsFailed;
const GET_SUCCESS_ACTION = getPaymentSuccess;
const GET_FAILED_ACTION = getPaymentFailed;
const CREATE_SUCCESS_ACTION = registerPaymentSuccess;
const CREATE_FAILED_ACTION = registerPaymentFailed;
const UPDATE_SUCCESS_ACTION = updatePaymentSuccess;
const UPDATE_FAILED_ACTION = updatePaymentFail;


const LIST_URL = "/payments";

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
        showResponseMessage(response, "Pago creado!");
        yield put(CREATE_SUCCESS_ACTION(response))
        history.push(LIST_URL)

    } catch (error) {
        yield put(CREATE_FAILED_ACTION(error))
    }
}

function* update({payload: {id, data, history}}) {
    try {
        const response = yield call(PUT_API_REQUEST, id, data)
        showResponseMessage(response, "Pago actualizado!");
        yield put(UPDATE_SUCCESS_ACTION(response))
        history.push(LIST_URL)

    } catch (error) {
        yield put(UPDATE_FAILED_ACTION(error))
    }
}

export function* watchPayment() {
    yield takeEvery(ACTION_NAME_CREATE, register);
    yield takeEvery(ACTION_NAME_UPDATE, update);
    yield takeEvery(ACTION_NAME_LIST, fetch);
    yield takeEvery(ACTION_NAME_GET, get)
}

function* paymentSaga() {
    yield all([fork(watchPayment)])
}

export default paymentSaga

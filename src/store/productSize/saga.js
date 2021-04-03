import {all, call, fork, put, takeEvery} from "redux-saga/effects"

//Account Redux states
import {GET_PRODUCT_SIZES, GET_PRODUCT_SIZE, REGISTER_PRODUCT_SIZE, UPDATE_PRODUCT_SIZE, UPDATE_PRODUCT_SIZE_LIST} from "./actionTypes"

import {
    getProductSizesSuccess,
    getProductSizesFailed,
    registerProductSizeSuccess,
    getProductSizeSuccess,
    getProductSizeFailed,
    registerProductSizeFailed,
    updateProductSizeSuccess,
    updateProductSizeFail,
    updateProductSizeListFail,
    updateProductSizeListSuccess
} from "./actions"

import {
    registerProductSizeApi,
    updateProductSizeApi,
    fetchProductSizeApi,
    fetchProductSizesApi,
    updateProductSizeListApi
} from "../../helpers/backend_helper"

import Conditionals from "../../common/conditionals";

/**
 * *  Configuración de CRUD Saga (Realizar configuración para cada uno de las replicas)
 */

const ACTION_NAME_LIST        = GET_PRODUCT_SIZES;
const ACTION_NAME_GET         = GET_PRODUCT_SIZE;
const ACTION_NAME_CREATE      = REGISTER_PRODUCT_SIZE;
const ACTION_NAME_UPDATE      = UPDATE_PRODUCT_SIZE;
const ACTION_NAME_UPDATE_LIST = UPDATE_PRODUCT_SIZE_LIST;

const LIST_API_REQUEST      =   fetchProductSizesApi;
const GET_API_REQUEST       =   fetchProductSizeApi;
const POST_API_REQUEST      =   registerProductSizeApi;
const PUT_API_REQUEST       =   updateProductSizeApi;
const PUT_API_REQUEST_LIST  =   updateProductSizeListApi;

//actions
const LIST_SUCCESS_ACTION        =   getProductSizesSuccess;
const LIST_FAILED_ACTION         =   getProductSizesFailed;
const GET_SUCCESS_ACTION         =   getProductSizeSuccess;
const GET_FAILED_ACTION          =   getProductSizeFailed;
const CREATE_SUCCESS_ACTION      =   registerProductSizeSuccess;
const CREATE_FAILED_ACTION       =   registerProductSizeFailed;
const UPDATE_SUCCESS_ACTION      =   updateProductSizeSuccess;
const UPDATE_FAILED_ACTION       =   updateProductSizeFail;
const UPDATE_LIST_SUCCESS_ACTION =   updateProductSizeListSuccess;
const UPDATE_LIST_FAILED_ACTION  =   updateProductSizeListFail;


const LIST_URL = "/productSizes";

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

        yield put(CREATE_SUCCESS_ACTION(response))
        history.push(LIST_URL)
    } catch (error) {
        yield put(CREATE_FAILED_ACTION(error))
    }
}

function* update({ payload: { id, data, history } }) {
    try {
        const response = yield call(PUT_API_REQUEST, id, data)
        yield put(UPDATE_SUCCESS_ACTION(response))
        history.push(LIST_URL)

    } catch (error) {
        yield put(UPDATE_FAILED_ACTION(error))
    }
}

function* updateList({ payload: { id, data, history } }) {
    try {
        const response = yield call(PUT_API_REQUEST_LIST, id, data)
        yield put(UPDATE_LIST_SUCCESS_ACTION(response))
    } catch (error) {
        yield put(UPDATE_LIST_FAILED_ACTION(error))
    }
}

export function* watchProductSize() {
    yield takeEvery(ACTION_NAME_UPDATE_LIST, updateList);
    yield takeEvery(ACTION_NAME_UPDATE, update);
    yield takeEvery(ACTION_NAME_CREATE, register);
    yield takeEvery(ACTION_NAME_LIST, fetch);
    yield takeEvery(ACTION_NAME_GET, get)
}

function* productSizeSaga() {
    yield all([fork(watchProductSize)])
}

export default productSizeSaga

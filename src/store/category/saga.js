import {all, call, fork, put, takeEvery} from "redux-saga/effects"

//Account Redux states
import {GET_CATEGORIES, GET_CATEGORY, REGISTER_CATEGORY, UPDATE_CATEGORY} from "./actionTypes"

import {
    getCategoriesSuccess,
    getCategoriesFailed,
    registerCategorySuccess,
    getCategorySuccess,
    getCategoryFailed,
    registerCategoryFailed,
    updateCategorySuccess,
    updateCategoryFail
} from "./actions"

import {
    registerCategoryApi,
    updateCategoryApi,
    fetchCategoryApi,
    fetchCategoriesApi
} from "../../helpers/backend_helper"

import Conditionals from "../../common/conditionals";

/**
 * *  Configuración de CRUD Saga (Realizar configuración para cada uno de las replicas)
 */

const ACTION_NAME_LIST      =   GET_CATEGORIES;
const ACTION_NAME_GET       =   GET_CATEGORY;
const ACTION_NAME_CREATE    =   REGISTER_CATEGORY;
const ACTION_NAME_UPDATE    =   UPDATE_CATEGORY;

const LIST_API_REQUEST      =   fetchCategoriesApi;
const GET_API_REQUEST       =   fetchCategoryApi;
const POST_API_REQUEST      =   registerCategoryApi;
const PUT_API_REQUEST       =   updateCategoryApi;

//actions
const LIST_SUCCESS_ACTION   =   getCategoriesSuccess;
const LIST_FAILED_ACTION    =   getCategoriesFailed;
const GET_SUCCESS_ACTION    =   getCategorySuccess;
const GET_FAILED_ACTION     =   getCategoryFailed;
const CREATE_SUCCESS_ACTION =   registerCategorySuccess;
const CREATE_FAILED_ACTION  =   registerCategoryFailed;
const UPDATE_SUCCESS_ACTION =   updateCategorySuccess;
const UPDATE_FAILED_ACTION  =   updateCategoryFail;


const LIST_URL = "/categories";

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

export function* watchCategory() {
    yield takeEvery(ACTION_NAME_CREATE, register);
    yield takeEvery(ACTION_NAME_UPDATE, update);
    yield takeEvery(ACTION_NAME_LIST, fetch);
    yield takeEvery(ACTION_NAME_GET, get)
}

function* categorySaga() {
    yield all([fork(watchCategory)])
}

export default categorySaga

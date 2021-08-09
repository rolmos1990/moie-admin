import {all, call, fork, put, takeEvery} from "redux-saga/effects"

//Account Redux states
import {
    GET_OFFICES,
    GET_OFFICE,
    REGISTER_OFFICE,
    UPDATE_OFFICE,
    QUERY_OFFICES,
    DELETE_OFFICE,
    CONFIRM_OFFICE
} from "./actionTypes"

import {
    getOfficesSuccess,
    getOfficesFailed,
    registerOfficeSuccess,
    getOfficeSuccess,
    getOfficeFailed,
    registerOfficeFailed,
    updateOfficeSuccess,
    updateOfficeFail, queryOfficesSuccess, queryOfficesFailed,
    deleteOfficeFailed, deleteOfficeSuccess, confirmOfficeSuccess
} from "./actions"

import {
    registerOfficeApi,
    updateOfficeApi,
    fetchOfficeApi,
    fetchOfficesApi, deleteOfficeApi, confirmOfficeApi
} from "../../helpers/backend_helper"

import Conditionals from "../../common/conditionals";
import {showResponseMessage} from "../../helpers/service";

/**
 * *  Configuración de CRUD Saga (Realizar configuración para cada uno de las replicas)
*/

const ACTION_NAME_QUERY      =   QUERY_OFFICES;
const ACTION_NAME_LIST      =   GET_OFFICES;
const ACTION_NAME_GET       =   GET_OFFICE;
const ACTION_NAME_CREATE    =   REGISTER_OFFICE;
const ACTION_NAME_UPDATE    =   UPDATE_OFFICE;
const ACTION_NAME_DELETE    =   DELETE_OFFICE;
const ACTION_NAME_CONFIRM    =   CONFIRM_OFFICE;

const LIST_API_REQUEST      =   fetchOfficesApi;
const GET_API_REQUEST       =   fetchOfficeApi;
const POST_API_REQUEST      =   registerOfficeApi;
const PUT_API_REQUEST       =   updateOfficeApi;

//actions
const QUERY_SUCCESS_ACTION  =   queryOfficesSuccess;
const QUERY_FAILED_ACTION   =   queryOfficesFailed;
const LIST_SUCCESS_ACTION   =   getOfficesSuccess;
const LIST_FAILED_ACTION    =   getOfficesFailed;
const GET_SUCCESS_ACTION    =   getOfficeSuccess;
const GET_FAILED_ACTION     =   getOfficeFailed;
const CREATE_SUCCESS_ACTION =   registerOfficeSuccess;
const CREATE_FAILED_ACTION  =   registerOfficeFailed;
const UPDATE_SUCCESS_ACTION =   updateOfficeSuccess;
const UPDATE_FAILED_ACTION  =   updateOfficeFail;


const LIST_URL = "/offices";
const SHOW_URL = "/office";

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
function* queryData({params ={}, node='offices'}) {
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
       history.push(SHOW_URL + "/" + response.office.id);
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

function* officeDelete({ payload: { id, history } }) {
    try {
        yield call(deleteOfficeApi, id)
        yield put(deleteOfficeSuccess(id))
        showResponseMessage({status:200}, "Despacho borrado!");
        history.push("/offices")

    } catch (error) {
        console.log("error", error);
        yield put(deleteOfficeFailed(error))
    }
}

function* officeConfirm({ payload: { id, history } }) {
    try {
        yield call(confirmOfficeApi, id)
        yield put(confirmOfficeSuccess(id))
        showResponseMessage({status:200}, "Despacho ha sido finalizado!");
        history.push("/offices")

    } catch (error) {
        console.log("error", error);
        yield put(deleteOfficeFailed(error))
    }
}

export function* watchOffice() {
    yield takeEvery(ACTION_NAME_CREATE, register);
    yield takeEvery(ACTION_NAME_UPDATE, update);
    yield takeEvery(ACTION_NAME_LIST, fetch);
    yield takeEvery(ACTION_NAME_GET, get);
    yield takeEvery(ACTION_NAME_DELETE, officeDelete);
    yield takeEvery(ACTION_NAME_CONFIRM, officeConfirm);
    yield takeEvery(ACTION_NAME_QUERY, queryData);
}

function* officeSaga() {
    yield all([fork(watchOffice)])
}

export default officeSaga

import {all, call, fork, put, takeEvery} from "redux-saga/effects"

//Account Redux states
import {
    GET_OFFICES,
    GET_OFFICE,
    REGISTER_OFFICE,
    UPDATE_OFFICE,
    QUERY_OFFICES,
    DELETE_OFFICE,
    CONFIRM_OFFICE, ADD_ORDER_OFFICE, IMPORT_FILE, PRINT_OFFICE_REPORT
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
    deleteOfficeFailed, deleteOfficeSuccess, confirmOfficeSuccess, importFileSuccess, importFileFailed, getOffice, printOfficeReportSuccess, printOfficeReportFailed
} from "./actions"

import {
    registerOfficeApi,
    updateOfficeApi,
    fetchOfficeApi,
    fetchOfficesApi, deleteOfficeApi, confirmOfficeApi, addOrderOfficeApi, importFileApi, printOfficeReportApi
} from "../../helpers/backend_helper"

import Conditionals from "../../common/conditionals";
import {showResponseMessage} from "../../helpers/service";

/**
 * *  Configuración de CRUD Saga (Realizar configuración para cada uno de las replicas)
 */

const ACTION_NAME_QUERY = QUERY_OFFICES;
const ACTION_NAME_LIST = GET_OFFICES;
const ACTION_NAME_GET = GET_OFFICE;
const ACTION_NAME_CREATE = REGISTER_OFFICE;
const ACTION_NAME_UPDATE = UPDATE_OFFICE;
const ACTION_NAME_DELETE = DELETE_OFFICE;
const ACTION_NAME_CONFIRM = CONFIRM_OFFICE;
const ACTION_NAME_ADD_CHILD = ADD_ORDER_OFFICE;
const IMPORT_FILE_POST = IMPORT_FILE;
const PRINT_OFFICE_REPORT_POST = PRINT_OFFICE_REPORT;

const LIST_API_REQUEST = fetchOfficesApi;
const GET_API_REQUEST = fetchOfficeApi;
const POST_API_REQUEST = registerOfficeApi;
const PUT_API_REQUEST = updateOfficeApi;
const IMPORT_FILE_API_REQUEST = importFileApi;

//actions
const QUERY_SUCCESS_ACTION = queryOfficesSuccess;
const QUERY_FAILED_ACTION = queryOfficesFailed;
const LIST_SUCCESS_ACTION = getOfficesSuccess;
const LIST_FAILED_ACTION = getOfficesFailed;
const GET_SUCCESS_ACTION = getOfficeSuccess;
const GET_FAILED_ACTION = getOfficeFailed;
const CREATE_SUCCESS_ACTION = registerOfficeSuccess;
const CREATE_FAILED_ACTION = registerOfficeFailed;
const UPDATE_SUCCESS_ACTION = updateOfficeSuccess;
const UPDATE_FAILED_ACTION = updateOfficeFail;
const IMPORT_FILE_SUCCESS_ACTION = importFileSuccess;
const IMPORT_FILE_FAILED_ACTION = importFileFailed;


const LIST_URL = "/offices";
const SHOW_URL = "/office";

function* get({id}) {
    try {
        const response = yield call(GET_API_REQUEST, {id});
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

function* queryData({params = {}, node = 'offices'}) {
    try {
        const response = yield call(LIST_API_REQUEST, params)
        yield put(QUERY_SUCCESS_ACTION(response.data, response.meta, node));
    } catch (error) {
        yield put(QUERY_FAILED_ACTION(error))
    }
}

function* register({payload: {data, history}}) {
    try {
        const response = yield call(POST_API_REQUEST, data)
        showResponseMessage(response, "Despacho creado!");
        yield put(CREATE_SUCCESS_ACTION(response))
        history.push(SHOW_URL + "/" + response.office.id);
    } catch (error) {
        yield put(CREATE_FAILED_ACTION(error))
    }
}

function* update({payload: {id, data, history}}) {
    try {
        const response = yield call(PUT_API_REQUEST, id, data)
        showResponseMessage(response, "Despacho actualizado!")
        yield put(UPDATE_SUCCESS_ACTION(response))
        yield put(getOffice(id))
    } catch (error) {
        yield put(UPDATE_FAILED_ACTION(error))
    }
}

function* officeDelete({payload: {id, history}}) {
    try {
        yield call(deleteOfficeApi, id)
        yield put(deleteOfficeSuccess(id))
        showResponseMessage({status: 200}, "Despacho borrado!");
        history.push("/offices")

    } catch (error) {
        console.log("error", error);
        yield put(deleteOfficeFailed(error))
    }
}

function* officeConfirm({payload: {id, history}}) {
    try {
        yield call(confirmOfficeApi, id)
        yield put(confirmOfficeSuccess(id))
        showResponseMessage({status: 200}, "Despacho ha sido finalizado!");
        history.push("/offices")

    } catch (error) {
        console.log("error", error);
        yield put(deleteOfficeFailed(error))
    }
}

function* officeOrderAdd({payload: {id, data, conditional, history}}) {
    try {
        const cond = Conditionals.getConditionalFormat(conditional);
        const query = Conditionals.buildHttpGetQuery(cond, 0, 200);
        yield call(addOrderOfficeApi, id, data, query)
        yield put(deleteOfficeSuccess(id))
        showResponseMessage({status: 200}, "Despacho creado!");
        history.push("/office/" + id)

    } catch (error) {
        console.log("error", error);
        yield put(deleteOfficeFailed(error))
    }
}

function* importFile({payload: {data}}) {
    try {
        console.log('importFile')
        const response = yield call(IMPORT_FILE_API_REQUEST, data)
        let message = "Cantidad de registros importados: " + (response.status === 200 ? response.data.registers.length : 0);
        showResponseMessage(response, message);
        yield put(IMPORT_FILE_SUCCESS_ACTION(response))
    } catch (error) {
        console.log("error", error);
        yield put(IMPORT_FILE_FAILED_ACTION(error.message))
    }
}

function* printOfficeReport({payload: {id}}) {
    try {
        console.log('printOfficeReport', id)
        const response = yield call(printOfficeReportApi, id)
        if (response.status !== 200) {
            yield put(printOfficeReportFailed(response.error))
            showResponseMessage(response, response.error);
        } else {
            yield put(printOfficeReportSuccess(response))
        }
    } catch (error) {
        console.log("error", error);
        yield put(printOfficeReportFailed(error.message))
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
    yield takeEvery(ACTION_NAME_ADD_CHILD, officeOrderAdd);
    yield takeEvery(IMPORT_FILE_POST, importFile);
    yield takeEvery(PRINT_OFFICE_REPORT_POST, printOfficeReport);
}

function* officeSaga() {
    yield all([fork(watchOffice)])
}

export default officeSaga

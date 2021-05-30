import {all, call, fork, put, takeEvery} from "redux-saga/effects"

//Account Redux states
import {GET_COMMENTS, GET_COMMENT, REGISTER_COMMENT, UPDATE_COMMENT, DELETE_COMMENT} from "./actionTypes"

import {
    getCommentsSuccess,
    getCommentsFailed,
    registerCommentSuccess,
    getCommentSuccess,
    getCommentFailed,
    registerCommentFailed,
    updateCommentSuccess,
    updateCommentFail, deleteCommentSuccess, deleteCommentFail, getComments, getCommentsByEntity
} from "./actions"

import {
    registerCommentApi,
    updateCommentApi,
    fetchCommentApi,
    fetchCommentsApi, deleteCommentApi
} from "../../helpers/backend_helper"

import Conditionals from "../../common/conditionals";
import {showResponseMessage} from "../../helpers/service";

/**
 * *  Configuración de CRUD Saga (Realizar configuración para cada uno de las replicas)
 */

const ACTION_NAME_LIST      =   GET_COMMENTS;
const ACTION_NAME_GET       =   GET_COMMENT;
const ACTION_NAME_CREATE    =   REGISTER_COMMENT;
const ACTION_NAME_UPDATE    =   UPDATE_COMMENT;
const ACTION_NAME_DELETE    =   DELETE_COMMENT;

const LIST_API_REQUEST      =   fetchCommentsApi;
const GET_API_REQUEST       =   fetchCommentApi;
const POST_API_REQUEST      =   registerCommentApi;
const PUT_API_REQUEST       =   updateCommentApi;
const DELETE_API_REQUEST    =   deleteCommentApi;

//actions
const LIST_ACTION           =   getCommentsByEntity;
const LIST_SUCCESS_ACTION   =   getCommentsSuccess;
const LIST_FAILED_ACTION    =   getCommentsFailed;
const GET_SUCCESS_ACTION    =   getCommentSuccess;
const GET_FAILED_ACTION     =   getCommentFailed;
const CREATE_SUCCESS_ACTION =   registerCommentSuccess;
const CREATE_FAILED_ACTION  =   registerCommentFailed;
const UPDATE_SUCCESS_ACTION =   updateCommentSuccess;
const UPDATE_FAILED_ACTION  =   updateCommentFail;
const DELETE_SUCCESS_ACTION =   deleteCommentSuccess;
const DELETE_FAILED_ACTION  =   deleteCommentFail;

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
function* register({ payload: {idRelated, data } }) {
    try {
        const response = yield call(POST_API_REQUEST, idRelated, data)
        yield put(CREATE_SUCCESS_ACTION(response))
        yield put(LIST_ACTION(data.entity, idRelated))
    } catch (error) {
        yield put(CREATE_FAILED_ACTION(error))
    }
}
function* update({ payload: { id, data } }) {
    try {
        const response = yield call(PUT_API_REQUEST, id, data)
        yield put(UPDATE_SUCCESS_ACTION(response))
    } catch (error) {
        yield put(UPDATE_FAILED_ACTION(error))
    }
}
function* remove({ payload: { comment} }) {
    try {
        const response = yield call(DELETE_API_REQUEST, comment.id)
        yield put(DELETE_SUCCESS_ACTION(response))
        yield put(LIST_ACTION(comment.entity, comment.idRelated))
    } catch (error) {
        yield put(DELETE_FAILED_ACTION(error))
    }
}

export function* watchComment() {
    yield takeEvery(ACTION_NAME_CREATE, register);
    yield takeEvery(ACTION_NAME_UPDATE, update);
    yield takeEvery(ACTION_NAME_DELETE, remove);
    yield takeEvery(ACTION_NAME_LIST, fetch);
    yield takeEvery(ACTION_NAME_GET, get)
}

function* commentSaga() {
    yield all([fork(watchComment)])
}

export default commentSaga

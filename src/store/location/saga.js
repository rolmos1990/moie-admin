import {all, call, fork, put, takeEvery} from "redux-saga/effects"

import {fetchStates, fetchMunicipalities} from "../../helpers/backend_helper";
import {getMunicipalitiesFailed, getMunicipalitiesSuccess, getStatesFailed, getStatesSuccess} from "./actions";
import {GET_STATES, GET_MUNICIPALITIES} from "./actionTypes";
import Conditionals from "../../common/conditionals";

function* fetchStatesSaga({conditional = [], limit = null, offset = null}) {
    try {
        const cond = Conditionals.getConditionalFormat(conditional);
        const query = Conditionals.buildHttpGetQuery(cond, limit, offset);
        const response = yield call(fetchStates, query)
        yield put(getStatesSuccess(response.data))
    } catch (error) {
        yield put(getStatesFailed(error))
    }
}

function* fetchMunicipalitiesSaga({conditional = [], limit = null, offset = null}) {
    try {
        const cond = Conditionals.getConditionalFormat(conditional);
        const query = Conditionals.buildHttpGetQuery(cond, limit, offset);

        const response = yield call(fetchMunicipalities, query)
        yield put(getMunicipalitiesSuccess(response.data))
    } catch (error) {
        yield put(getMunicipalitiesFailed(error))
    }
}


export function* watchCustomer() {
    yield takeEvery(GET_STATES, fetchStatesSaga)
    yield takeEvery(GET_MUNICIPALITIES, fetchMunicipalitiesSaga)
}

function* locationSaga() {
    yield all([fork(watchCustomer)])
}

export default locationSaga

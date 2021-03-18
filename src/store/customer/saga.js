import {all, call, fork, put, takeEvery} from "redux-saga/effects"

//Account Redux states
import {GET_CUSTOMERS, GET_CUSTOMER, REGISTER_CUSTOMER, UPDATE_CUSTOMER} from "./actionTypes"
import {
    getCustomersSuccess,
    registerCustomerSuccess,
    getCustomersFail,
    getCustomerSuccess,
    getCustomerFail,
    registerCustomerFail,
    updateCustomerSuccess, updateCustomerFail
} from "./actions"

//Include Both Helper File with needed methods
import {
    registerCustomer,
    updateCustomer,
    fetchCustomer
} from "../../helpers/backend_helper"

function* fetchCustomerById({ id }) {
    try {
        const response = yield call(fetchCustomer, { id });
        yield put(getCustomerSuccess(response))
    } catch (error) {
        yield put(getCustomerFail(error))
    }
}


function* fetchCustomers() {
    try {
        const response = yield call(fetchCustomer)
        yield put(getCustomersSuccess(response.data))
    } catch (error) {
        yield put(getCustomersFail(error))
    }
}

// Is customer register successfull then direct plot user in redux.
function* customerRegister({ payload: { customer, history } }) {
    try {
        const response = yield call(registerCustomer, customer)
        yield put(registerCustomerSuccess(response))
        history.push("/customers")

    } catch (error) {
        yield put(registerCustomerFail(error))
    }
}

// Is customer register successfull then direct plot user in redux.
function* customerUpdate({ payload: { id, customer, history } }) {
    try {
        const response = yield call(updateCustomer, id, customer)
        yield put(updateCustomerSuccess(response))
        history.push("/customers")

    } catch (error) {
        console.log("error", error);
        yield put(updateCustomerFail(error))
    }
}

export function* watchCustomer() {
    yield takeEvery(REGISTER_CUSTOMER, customerRegister);
    yield takeEvery(UPDATE_CUSTOMER, customerUpdate);
    yield takeEvery(GET_CUSTOMERS, fetchCustomers);
    yield takeEvery(GET_CUSTOMER, fetchCustomerById);
}

function* customerSaga() {
    yield all([fork(watchCustomer)])
}

export default customerSaga

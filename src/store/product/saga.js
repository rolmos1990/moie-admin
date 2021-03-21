import {all, call, fork, put, takeEvery} from "redux-saga/effects"

import { fetchProductsApi } from "../../helpers/backend_helper";
import {getProductsSuccess, getProductsFailed} from "./actions";
import {GET_PRODUCTS} from "./actionTypes";
import Conditionals from "../../common/conditionals";

function* fetchProducts({conditional = [], limit = null, offset = null}) {
    try {
        const cond = Conditionals.getConditionalFormat(conditional);
        const query = Conditionals.buildHttpGetQuery(cond, limit, offset);
        const response = yield call(fetchProductsApi, query)
        yield put(getProductsSuccess(response.data))
    } catch (error) {
        yield put(getProductsFailed(error))
    }
}

export function* watchCustomer() {
    yield takeEvery(GET_PRODUCTS, fetchProducts)
}

function* locationSaga() {
    yield all([fork(watchCustomer)])
}

export default locationSaga

import {all, call, fork, put, takeEvery} from "redux-saga/effects"

import {GENERATE_REPORT, GET_REPORT_DASHBOARD} from "./actionTypes"
import {b64toBlob} from "../../common/utils";
import {
    generateReportFailed,
    generateReportSuccess,
    getReportDashbordFailed,
    getReportDashbordSuccess
} from "./actions";
import {
    billReportApi,
    conciliationReportApi,
    officeReportApi,
    postSaleReportApi,
    statsDashboardApi
} from "../../helpers/backend_helper";
import {REPORT_TYPES} from "../../common/constants";
import {showResponseMessage} from "../../helpers/service";

const apiMap = {}
apiMap[REPORT_TYPES.BILLS] = billReportApi;
apiMap[REPORT_TYPES.CONCILIATION] = conciliationReportApi;
apiMap[REPORT_TYPES.POST_SALE] = postSaleReportApi;
apiMap[REPORT_TYPES.OFFICE] = officeReportApi;
const STAT_DASHBOARD = statsDashboardApi;


function* generateReport({reportType, data}) {
    try {
        if (!apiMap[reportType]) {
            showResponseMessage({status: 500}, "Reporte no valido");
        }
        const blob = yield call(apiMap[reportType], new URLSearchParams(data));
        console.log('generateReport', blob)
        const _url = window.URL.createObjectURL(b64toBlob(blob.data));
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = _url;
        // the filename you want
        a.download = blob.name;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(_url);
        yield put(generateReportSuccess());
        showResponseMessage({status: 200}, "Reporte generado!");
    } catch (e) {
        console.log("DEBUG -- error ", e.message);
        yield put(generateReportFailed(e.message))
        showResponseMessage({status: 500}, "No se logró general el reporte");
    }
}

function* getStatDashboard() {
    try {
        const response = yield call(STAT_DASHBOARD)
        yield put(getReportDashbordSuccess(response));
    } catch (error) {
        yield put(getReportDashbordFailed(error))
    }
}

export function* watchReport() {
    yield takeEvery(GENERATE_REPORT, generateReport)
    yield takeEvery(GET_REPORT_DASHBOARD, getStatDashboard)
}

function* reportSaga() {
    yield all([fork(watchReport)])
}

export default reportSaga

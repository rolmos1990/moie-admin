import {fetchDataApi} from "./backend_helper";
import Conditionals from "../common/conditionals";
import {showMessage} from "../components/MessageToast/ShowToastMessages";
import {DEFAULT_PAGE_LIMIT} from "../common/pagination";

export const getData = (urlStr, name, conditionalOptions ) => {
    const conditions = new Conditionals.Condition;
    if (name) {
        if (conditionalOptions) {
            conditions.add(conditionalOptions.fieldName, name, conditionalOptions.operator);
        } else {
            conditions.add('name', name, Conditionals.OPERATORS.LIKE);
        }
    }
    const cond = Conditionals.getConditionalFormat(conditions.all());
    const query = Conditionals.buildHttpGetQuery(cond, DEFAULT_PAGE_LIMIT, 0);
    return fetchDataApi(urlStr, query);
}

export const showResponseMessage = (response, message) => {
    if (response.status === 200) {
        showMessage.success(message);
    } else {
        showMessage.error(message);
    }
}

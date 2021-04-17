import {fetchDataApi} from "./backend_helper";
import Conditionals from "../common/conditionals";
import {showMessage} from "../components/MessageToast/ShowToastMessages";

export const getData =(urlStr, name)=>{
    const conditions = new Conditionals.Condition;
    if (name) {
        conditions.add('name', name, Conditionals.OPERATORS.LIKE);
    }
    return fetchDataApi(urlStr, conditions.all());
}

export const showResponseMessage =(response, message)=>{
    if(response.status === 200){
        showMessage.success(message);
    } else{
        showMessage.error(message);
    }
}

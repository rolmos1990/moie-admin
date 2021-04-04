import {fetchDataApi} from "./backend_helper";
import Conditionals from "../common/conditionals";

export const getData =(urlStr, name)=>{
    const conditions = new Conditionals.Condition;
    if (name) {
        conditions.add('name', name, Conditionals.OPERATORS.LIKE);
    }
    return fetchDataApi(urlStr, conditions.all());
}

// Login Method
import {get, post, put} from "./api_helper";
import * as url from "./url_helper";

const postLogin = data => post(url.POST_LOGIN, data);

const registerCustomer = data => post(url.POST_CUSTOMER, data);

const updateCustomer = (id, data) => put(`${url.PUT_CUSTOMER}/${id}`, data);

//customers
const fetchCustomer = data => get((data && data.id) ? `${url.GET_CUSTOMER}/${data.id}` : url.GET_CUSTOMER, data);

//locations
const fetchStates = data => get(url.GET_STATES, {}, data);

const fetchMunicipalities = data => get(url.GET_MUNICIPALITIES, {}, data);


export {
    postLogin,
    registerCustomer,
    updateCustomer,
    fetchCustomer,
    fetchStates,
    fetchMunicipalities
}

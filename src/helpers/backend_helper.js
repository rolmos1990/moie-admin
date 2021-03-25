// Login Method
import {get, post, put, del} from "./api_helper";
import * as url from "./url_helper";

const postLogin = data => post(url.POST_LOGIN, data);

const registerCustomer = data => post(url.POST_CUSTOMER, data);

const updateCustomer = (id, data) => put(`${url.PUT_CUSTOMER}/${id}`, data);

//customers
const fetchCustomersApi = data => get(url.GET_CUSTOMER, {}, data);
const fetchCustomer = data => get((data && data.id) ? `${url.GET_CUSTOMER}/${data.id}` : url.GET_CUSTOMER, data);
const deleteCustomerApi = (id) => del(`${url.PUT_CUSTOMER}/${id}`);

//products
const fetchProductsApi = data => get(url.GET_PRODUCT, {}, data);
const fetchProductApi = data => get((data && data.id) ? `${url.GET_PRODUCT}/${data.id}` : url.GET_PRODUCT, data);
const registerProductApi = data => post(url.POST_PRODUCT, data);
const updateProductApi = (id, data) => put(`${url.PUT_PRODUCT}/${id}`, data);
//const deleteProductApi = (id) => del(`${url.DELETE_PRODUCT}/${id}`);

//locations
const fetchStates = data => get(url.GET_STATES, {}, data);

const fetchMunicipalities = data => get(url.GET_MUNICIPALITIES, {}, data);


export {
    postLogin,
    registerCustomer,
    updateCustomer,
    fetchCustomer,
    fetchCustomersApi,
    deleteCustomerApi,
    fetchProductsApi,
    fetchStates,
    fetchMunicipalities,
    fetchProductApi,
    registerProductApi,
    updateProductApi
}

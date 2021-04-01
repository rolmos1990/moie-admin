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

//Categories
const fetchCategoriesApi = data => get(url.CATEGORY, {}, data);
const fetchCategoryApi = (id) => get(`${url.CATEGORY}/${id}`,{});
const registerCategoryApi = data => post(url.CATEGORY, data);
const updateCategoryApi = (id, data) => put(`${url.CATEGORY}/${id}`, data);

//Categories
const fetchSizesApi = data => get(url.SIZE, {}, data);
const fetchSizeApi = (id) => get(`${url.SIZE}/${id}`,{});
const registerSizeApi = data => post(url.SIZE, data);
const updateSizeApi = (id, data) => put(`${url.SIZE}/${id}`, data);

//locations
const fetchStatesApi = data => get(url.STATES, {}, data);
const fetchStateApi = (id) => get(`${url.STATES}/${id}`,{});
const registerStateApi = data => post(url.STATES, data);
const updateStateApi = (id, data) => put(`${url.STATES}/${id}`, data);
const deleteStateApi = (id) => del(`${url.STATES}/${id}`);

const fetchMunicipalitiesApi = data => get(url.MUNICIPALITIES, {}, data);
const fetchMunicipalityApi = (id) => get(`${url.MUNICIPALITIES}/${id}`,{});
const registerMunicipalityApi = data => post(url.MUNICIPALITIES, data);
const updateMunicipalityApi = (id, data) => put(`${url.MUNICIPALITIES}/${id}`, data);
const deleteMunicipalityApi = (id) => del(`${url.MUNICIPALITIES}/${id}`);


export {
    postLogin,
    registerCustomer,
    updateCustomer,
    fetchCustomer,
    fetchCustomersApi,
    deleteCustomerApi,
    fetchProductsApi,

    fetchStatesApi,
    fetchStateApi,
    updateStateApi,
    registerStateApi,
    deleteStateApi,

    fetchMunicipalitiesApi,
    fetchMunicipalityApi,
    updateMunicipalityApi,
    registerMunicipalityApi,
    deleteMunicipalityApi,

    fetchProductApi,
    registerProductApi,
    updateProductApi,

    fetchCategoriesApi,
    fetchCategoryApi,
    registerCategoryApi,
    updateCategoryApi,

    fetchSizesApi,
    fetchSizeApi,
    registerSizeApi,
    updateSizeApi,
}

// Login Method
import {del, get, post, put} from "./api_helper";
import * as url from "./url_helper";
import {DELIVERY_METHODS} from "./url_helper";

const postLogin = data => post(url.POST_LOGIN, data);

const registerCustomer = data => post(url.POST_CUSTOMER, data);

const updateCustomer = (id, data) => put(`${url.PUT_CUSTOMER}/${id}`, data);

//customers
const fetchCustomersApi = data => get(url.GET_CUSTOMER, {}, data);
const fetchCustomer = data => get((data && data.id) ? `${url.GET_CUSTOMER}/${data.id}` : url.GET_CUSTOMER, data);
const deleteCustomerApi = (id) => del(`${url.PUT_CUSTOMER}/${id}`);

//products
const fetchProductsApi = params => get(url.GET_PRODUCT, {}, params);
const fetchProductApi = data => get((data && data.id) ? `${url.GET_PRODUCT}/${data.id}` : url.GET_PRODUCT, data);
const registerProductApi = data => post(url.POST_PRODUCT, data);
const updateProductApi = (id, data) => put(`${url.PUT_PRODUCT}/${id}`, data);
//const deleteProductApi = (id) => del(`${url.DELETE_PRODUCT}/${id}`);
const updateProductSizeListApi = (productId, data) => post(`${url.POST_PRODUCT}/${productId}/changeSize`, data);
const getProductsPendingApi = (productId) => get(`${url.POST_PRODUCT}/${productId}/productPendings`, {}, {});

//Categories
const fetchCategoriesApi = data => get(url.CATEGORY, {}, data);
const fetchCategoryApi = (id) => get(`${url.CATEGORY}/${id}`,{});
const registerCategoryApi = data => post(url.CATEGORY, data);
const updateCategoryApi = (id, data) => put(`${url.CATEGORY}/${id}`, data);

//Sizes template
const fetchSizesApi = data => get(url.SIZE, {}, data);
const fetchSizeApi = (id) => get(`${url.SIZE}/${id}`,{});
const registerSizeApi = data => post(url.SIZE, data);
const updateSizeApi = (id, data) => put(`${url.SIZE}/${id}`, data);

//Product Sizes
const fetchProductSizesApi = data => get(url.PRODUCT_SIZE, {}, data);
const fetchProductSizeApi = (id) => get(`${url.PRODUCT_SIZE}/${id}`,{});
const registerProductSizeApi = data => post(url.PRODUCT_SIZE, data);
const updateProductSizeApi = (id, data) => put(`${url.PRODUCT_SIZE}/${id}`, data);


//Product images
const fetchProductImagesApi = data => get(url.PRODUCT_IMAGES, {}, data);
const fetchProductImageApi = (productId) => get(`${url.PRODUCT_IMAGES}/${productId}`,{});
const registerProductImageApi = data => post(url.PRODUCT_IMAGES, data);
const updateProductImageApi = (productId, data) => put(`${url.PRODUCT_IMAGES}/${productId}`, data);

//FieldOptions
const fetchFieldOptionsApi = data => get(url.FIELD_OPTIONS, {}, data);
const fetchFieldOptionApi = (id) => get(`${url.FIELD_OPTIONS}/${id}`,{});
const registerFieldOptionApi = data => post(url.FIELD_OPTIONS, data);
const updateFieldOptionApi = (id, data) => put(`${url.FIELD_OPTIONS}/${id}`, data);
const deleteFieldOptionApi = (id, data) => del(`${url.FIELD_OPTIONS}/${id}`, data);

//Delivery locality
const fetchDeliveryLocalitiesApi = data => get(url.DELIVERY_LOCALITY, {}, data);
const fetchDeliveryLocalityApi = (id) => get(`${url.DELIVERY_LOCALITY}/${id}`,{});
const registerDeliveryLocalityApi = data => post(url.DELIVERY_LOCALITY, data);
const updateDeliveryLocalityApi = (id, data) => put(`${url.DELIVERY_LOCALITY}/${id}`, data);

//locations
const fetchStatesApi = data => get(url.STATES, {}, data);
const fetchStateApi = (id) => get(`${url.STATES}/${id}`,{});
const registerStateApi = data => post(url.STATES, data);
const updateStateApi = (id, data) => put(`${url.STATES}/${id}`, data);
const deleteStateApi = (id) => del(`${url.STATES}/${id}`);

//orders
const fetchOrdersApi = data => get(url.ORDERS, {}, data);
const fetchOrderApi = (id) => get(`${url.ORDERS}/${id}`,{});
const registerOrderApi = data => post(url.ORDERS, data);
const nextStatusOrderApi = data => post(`${url.ORDERS}/nextStatus`, data);
const updateOrderApi = (id, data) => put(`${url.ORDERS}/${id}`, data);
const deleteOrderApi = (id) => del(`${url.ORDERS}/${id}`);

const fetchDeliveryMethodsApi = () => get(`${url.DELIVERY_METHODS}`,{});
const fetchDeliveryQuoteApi = (data) => post(`${url.DELIVERY_METHODS}/quote`,data);

const fetchMunicipalitiesApi = data => get(url.MUNICIPALITIES, {}, data);
const fetchMunicipalityApi = (id) => get(`${url.MUNICIPALITIES}/${id}`,{});
const registerMunicipalityApi = data => post(url.MUNICIPALITIES, data);
const updateMunicipalityApi = (id, data) => put(`${url.MUNICIPALITIES}/${id}`, data);
const deleteMunicipalityApi = (id) => del(`${url.MUNICIPALITIES}/${id}`);

const fetchDataApi = (urlStr, data) => get(urlStr, {}, data);

export {
    fetchDataApi,

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

    fetchProductSizesApi,
    fetchProductSizeApi,
    registerProductSizeApi,
    updateProductSizeApi,
    updateProductSizeListApi,

    getProductsPendingApi,
    nextStatusOrderApi,

    fetchProductImagesApi,
    fetchProductImageApi,
    registerProductImageApi,
    updateProductImageApi,

    fetchDeliveryLocalitiesApi,
    fetchDeliveryLocalityApi,
    registerDeliveryLocalityApi,
    updateDeliveryLocalityApi,

    fetchFieldOptionsApi,
    fetchFieldOptionApi,
    registerFieldOptionApi,
    updateFieldOptionApi,
    deleteFieldOptionApi,

    fetchOrdersApi,
    fetchOrderApi,
    registerOrderApi,
    updateOrderApi,
    deleteOrderApi,

    fetchDeliveryMethodsApi,
    fetchDeliveryQuoteApi,
}

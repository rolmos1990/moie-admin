// Login Method
import {del, file, get, post, put} from "./api_helper";
import * as url from "./url_helper";

const postLogin = data => post(url.POST_LOGIN, data);

const registerCustomer = data => post(url.CUSTOMER, data);

const updateCustomer = (id, data) => put(`${url.CUSTOMER}/${id}`, data);

//customers
const fetchCustomersApi = data => get(url.CUSTOMER, {}, data);
const fetchCustomer = data => get((data && data.id) ? `${url.CUSTOMER}/${data.id}` : url.CUSTOMER, data);
const deleteCustomerApi = (id) => del(`${url.CUSTOMER}/${id}`);

//products
const fetchProductsApi = params => get(url.PRODUCT, {}, params);
const fetchProductApi = data => get((data && data.id) ? `${url.PRODUCT}/${data.id}` : url.PRODUCT, data);
const registerProductApi = data => post(url.PRODUCT, data);
const updateProductApi = (id, data) => put(`${url.PRODUCT}/${id}`, data);
//const deleteProductApi = (id) => del(`${url.DELETE_PRODUCT}/${id}`);
const updateProductSizeListApi = (productId, data) => post(`${url.PRODUCT}/${productId}/changeSize`, data);
const getProductsPendingApi = (productId) => get(`${url.PRODUCT}/${productId}/productPendings`, {}, {});

//Categories
const fetchCategoriesApi = data => get(url.CATEGORY, {}, data);
const fetchCategoryApi = (id) => get(`${url.CATEGORY}/${id}`,{});
const registerCategoryApi = data => post(url.CATEGORY, data);
const updateCategoryApi = (id, data) => put(`${url.CATEGORY}/${id}`, data);
const catalogBatchPrintRequestApi = (data) => get(`${url.CATEGORY}/batch/printRequest`,{}, data);

//Users
const fetchUsersApi = data => get(url.USER, {}, data);
const fetchUserApi = (id) => get(`${url.USER}/${id}`,{});
const registerUserApi = data => post(url.USER, data);
const updateUserApi = (id, data) => put(`${url.USER}/${id}`, data);
const changePasswordApi = (data) => post(`${url.USER}/changePassword`, data);

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

//Comments
const fetchCommentsApi = data => get(url.COMMENT, {}, data);
const fetchCommentApi = (id) => get(`${url.COMMENT}/${id}`,{});
const registerCommentApi = (idRelated, data) => post(`${url.COMMENT}/${idRelated}`, data);
const updateCommentApi = (id, data) => put(`${url.COMMENT}/${id}`, data);
const deleteCommentApi = (id) => del(`${url.COMMENT}/${id}`);


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
const printOrderApi = id => get(`${url.ORDERS}/${id}/print`, {}, {});
const resumeOrderApi = id => get(`${url.ORDERS}/${id}/boardResume`, {}, {});
const updateOrderApi = (id, data) => put(`${url.ORDERS}/${id}`, data);
const deleteOrderApi = (id) => del(`${url.ORDERS}/${id}`);
const batchPrintRequestApi = (data) => get(`${url.ORDERS}/batch/printRequest`, {}, data);
const conciliationRequestApi = (data) => post(`${url.ORDERS}/conciliation`, data);

//offices
const fetchOfficesApi = params => get(url.OFFICES, {}, params);
const fetchOfficeApi = data => get((data && data.id) ? `${url.OFFICES}/${data.id}` : url.OFFICES, data);
const registerOfficeApi = data => post(url.OFFICES, data);
const updateOfficeApi = (id, data) => put(`${url.OFFICES}/${id}`, data);
const deleteOfficeApi = (id) => del(`${url.OFFICES}/${id}`);
const confirmOfficeApi = (id) => post(`${url.OFFICES}/${id}/confirm`);
const addOrderOfficeApi = (id, data, params) => post(`${url.OFFICES}/${id}/addOrder`, data, {params: params});
const importFileApi = data => post(`${url.OFFICES}/importFile`, data);
const printOfficeReportApi = id => get(`${url.OFFICES}/batch/printRequest/${id}`, {});

//bills
const fetchBillsApi = params => get(url.BILLS, {}, params);
const fetchBillApi = data => get((data && data.id) ? `${url.BILLS}/${data.id}` : url.BILLS, data);
const registerBillApi = data => post(url.BILLS, data);
const updateBillApi = (id, data) => put(`${url.BILLS}/${id}`, data);
const deleteBillApi = (id) => del(`${url.BILLS}/${id}`);
const confirmBillApi = (id) => post(`${url.BILLS}/${id}/confirm`);
const addOrderBillApi = (id, data, params) => post(`${url.BILLS}/${id}/addOrder`, data, {params: params});
const createCreditNoteApi = (id) => post(`${url.BILLS}/creditNote/${id}`, {}, {});

//templates
const fetchTemplatesApi = data => get(url.TEMPLATES, {}, data);
const fetchTemplateApi = (id) => get(`${url.TEMPLATES}/${id}`,{});
const registerTemplateApi = data => post(url.TEMPLATES, data);
const updateTemplateApi = (id, data) => put(`${url.TEMPLATES}/${id}`, data);

const fileOfficeTemplate = (filename, id) => file(filename, `${url.OFFICES}/${id}/getTemplate`, {header: 'content-type: application/vnd.ms-excel'});


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
    catalogBatchPrintRequestApi,
    conciliationRequestApi,

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
    batchPrintRequestApi,

    fetchTemplatesApi,
    fetchTemplateApi,
    registerTemplateApi,
    updateTemplateApi,

    fetchDeliveryMethodsApi,
    fetchDeliveryQuoteApi,

    printOrderApi,
    resumeOrderApi,

    fetchCommentsApi,
    fetchCommentApi,
    registerCommentApi,
    updateCommentApi,
    deleteCommentApi,

    fetchUsersApi,
    fetchUserApi,
    registerUserApi,
    updateUserApi,
    changePasswordApi,

    fetchOfficesApi,
    fetchOfficeApi,
    registerOfficeApi,
    updateOfficeApi,
    deleteOfficeApi,
    confirmOfficeApi,
    addOrderOfficeApi,
    importFileApi,
    printOfficeReportApi,

    fetchBillsApi,
    fetchBillApi,
    registerBillApi,
    updateBillApi,
    deleteBillApi,
    confirmBillApi,
    addOrderBillApi,
    createCreditNoteApi,

    fileOfficeTemplate
}

import axios from "axios";
import accessToken from "./jwt-token-access/accessToken";

//pass new generated access token here
const token = accessToken;

export const baseImagePath = "http://lucymodas.com/";
export const baseImagePathNew = "http://54.226.170.69:18210/";
//export const baseImagePathNew = "http://localhost:18210/";

//apply base url for axios
const API_URL = "http://localhost:18210";
// const API_URL = process.env.REACT_APP_SERVICE; //"http://54.226.170.69:18210";
// console.log('process.env.REACT_APP_SERVICE', API_URL)

const axiosApi = axios.create({
  baseURL: API_URL,
  timeout: 30000,
})

axiosApi.defaults.headers.common["Authorization"] = token;

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);

export async function get(url, config = {}, params = undefined) {
  return await axiosApi.get(url, {params: params, config: config}).then(response => response.data);
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, data, { ...config })
    .then(response => response.data);
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url,  data , { ...config })
    .then(response => response.data);
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data);
}

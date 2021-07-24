import axios from "axios";
import accessToken from "./jwt-token-access/accessToken";
import authHeader from "./jwt-token-access/auth-token-header";

//pass new generated access token here
const token = authHeader().Authorization || accessToken;

export const baseImagePath = process.env.REACT_APP_BASE_PATH_IMAGE;
export const baseImagePathNew = process.env.REACT_APP_BASE_PATH_IMAGE_NEW;
// export const baseImagePathNew = "http://54.226.170.69:18210/";

console.log('process.env', process.env)

const axiosApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_SERVICE,
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

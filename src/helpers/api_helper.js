import axios from "axios";
import accessToken from "./jwt-token-access/accessToken";
import authHeader from "./jwt-token-access/auth-token-header";
import {b64toBlob} from "../common/utils";

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

export async function file(filename, url, config, params) {
  try {
    const blob = await get(url, config, params);
    const _url = window.URL.createObjectURL(b64toBlob(blob.data));
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = _url;
    // the filename you want
    a.download = blob.name;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(_url);
  }catch(e){
    console.log("DEBUG -- error ", e.message);
  }

}

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

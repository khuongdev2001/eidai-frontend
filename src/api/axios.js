import axios from "axios";

export const BASE_URL_API = "https://eidai.com.vn";
export const BASE_URL_STOREAGE = BASE_URL_API;

const axiosCommon = axios.create({
  baseURL: BASE_URL_API,
  timeout: 10000
});


export default axiosCommon
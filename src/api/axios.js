import axios from "axios";

const axiosCommon = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 1000
  });


export default axiosCommon
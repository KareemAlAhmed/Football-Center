import axios from "axios";


import { baseUrl } from "./utils/baseUrl";

let token=sessionStorage.getItem("user-token")
const axiosClient= axios.create({
    baseURL:baseUrl
})

axiosClient.interceptors.request.use(config =>{
    config.headers.Authorization=`Bearer ${sessionStorage.getItem("user-token") === null ? "notAuthenticated" : sessionStorage.getItem("user-token")}`
    return config;
})

export default axiosClient;
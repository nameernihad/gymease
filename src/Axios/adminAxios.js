import axios from "axios";
import { adminAPI } from "../Constants/Api";

const adminInstance = axios.create({
  baseURL: adminAPI,
});

export default adminInstance;

// adminInstance.interceptors.request.use(
//   (config) => {
//     const adminCredentials = localStorage.getItem("persist:Admin");
//     const adminCredentialObject = JSON.parse(adminCredentials);
//     const adminToken = adminCredentialObject?.Token.replace(/^"(.*)"$/, "$1");

//     config.headers["Admin"] = `Bearer ${adminToken}`;

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
// adminInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

import axios from "axios";
import { userAPI } from "../Constants/Api";

const userInstance = axios.create({
  baseURL: userAPI,
});
export default userInstance;

userInstance.interceptors.request.use(
  (config) => {
    const userCredentials = localStorage.getItem("persist:Client");
    const userCredentialObject = JSON.parse(userCredentials);
    const userToken = userCredentialObject?.Token.replace(/^"(.*)"$/, "$1");

    config.headers["client"] = `Bearer ${userToken}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
userInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

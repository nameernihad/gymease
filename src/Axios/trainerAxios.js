import axios from "axios";
import { trainerAPI } from "../Constants/Api";

const trainerInstance = axios.create({
  baseURL: trainerAPI,
});

export default trainerInstance;

trainerInstance.interceptors.request.use(
  (config) => {
    const trainerCredentials = localStorage.getItem("persist:Trainer");
    const trainerCredentialObject = JSON.parse(trainerCredentials);
    const trainerToken = trainerCredentialObject?.Token.replace(
      /^"(.*)"$/,
      "$1"
    );

    config.headers["Trainer"] = `Bearer ${trainerToken}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
trainerInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

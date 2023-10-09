import axios from "axios";
import { trainerAPI } from "../Constants/Api";
import { toast } from "react-toastify"; // Import toast for displaying error messages
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling

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
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data.message;

      if (status === 403 && message === "Invalid token") {
        toast.error("Invalid token. Please log in again.");
        localStorage.removeItem("persist:Trainer");
        window.location.href = "/trainer/login"; 
      } else if (status === 401 && message === "Not authenticated") {
        toast.error("You are not authenticated. Please log in.");
        localStorage.removeItem("persist:Trainer");
        window.location.href = "/trainer/login"; 
      }
    }

    return Promise.reject(error);
  }
);

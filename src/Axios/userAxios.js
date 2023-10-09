import axios from "axios";
import { userAPI } from "../Constants/Api";
import { toast } from "react-toastify"; // Import toast for displaying error messages
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling

const userInstance = axios.create({
  baseURL: userAPI,
});

export default userInstance;

userInstance.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem("Client");

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
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data.message;

      if (status === 403 && message === "Invalid token") {
        toast.error("Invalid token. Please log in again.");
        localStorage.removeItem("Client");
        localStorage.removeItem("persist:Client");
        window.location.href = "/login"; 
      } else if (status === 401 && message === "Not authenticated") {
        toast.error("You are not authenticated. Please log in.");
        localStorage.removeItem("Client");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

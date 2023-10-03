import axios from "axios";
import { adminAPI } from "../Constants/Api";
import { toast } from "react-toastify"; // Import toast for displaying error messages
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling

const adminInstance = axios.create({
  baseURL: adminAPI,
});

export default adminInstance;

adminInstance.interceptors.request.use(
  (config) => {
    // Add your token logic here
    const adminCredentials = localStorage.getItem("persist:Admin");
    const adminCredentialObject = JSON.parse(adminCredentials);
    const adminToken = adminCredentialObject?.Token.replace(/^"(.*)"$/, "$1");

    config.headers["Admin"] = `Bearer ${adminToken}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

adminInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data.message;

      if (status === 403 && message === "Invalid token") {
        toast.error("Invalid token. Please log in again.");
        localStorage.removeItem("persist:Admin");
        window.location.href = "/admin/login"; 
      } else if (status === 401 && message === "Not authenticated!") {
        toast.error("You are not authenticated. Please log in.");
        localStorage.removeItem("persist:Admin");
        window.location.href = "/admin/login";
      }
    }

    return Promise.reject(error);
  }
);

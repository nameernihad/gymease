import axios from "axios";
import { videoAPI } from "../Constants/Api";

const videoInstance = axios.create({
  baseURL: videoAPI,
});
export default videoInstance;

import axios from "axios";
import { trainerAPI } from "../Constants/Api";

const trainerInstance = axios.create({
  baseURL: trainerAPI,
});

export default trainerInstance;

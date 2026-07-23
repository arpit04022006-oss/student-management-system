import axios from "axios";

const API = axios.create({
    baseURL: "https://student-management-backend-o4u3.onrender.com/api",
});

export default API;
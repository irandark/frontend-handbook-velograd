import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    timeout: 10000,
});

export default instance;

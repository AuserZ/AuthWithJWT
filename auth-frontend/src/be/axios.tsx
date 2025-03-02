import isTokenExpired from "@/util/JWTUtil";
import axios from "axios";

// Axios Interceptor Instance
const AxiosInstance = axios.create({
    baseURL: process.env.BASE_URL
});

const excludePaths = ["/auth/login", "/auth/register", "/auth/refresh"];

// Request Interceptor
AxiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken && !isTokenExpired(accessToken)) {
            if (accessToken && config.url && !excludePaths.includes(config.url)) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        }
        return config;
    }
)

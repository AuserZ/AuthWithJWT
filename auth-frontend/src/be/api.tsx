import axios from "axios";
import { DOMAIN_PATH, API_PATHS } from "./API_PATHS";

export const login = async (username: string, password: string) => {
    return await axios.post(`${DOMAIN_PATH}${API_PATHS.AUTH.LOGIN}`, {
        username,
        password
    });
};

export const register = async (email: string, password: string, username: string) => {
    return await axios.post(`${DOMAIN_PATH}${API_PATHS.AUTH.LOGIN}`, {
        email,
        username,
        password
    });
};

export const logout = async (accesstoken: string) => {
    return await axios.post(`${DOMAIN_PATH}${API_PATHS.AUTH.LOGOUT}`, {
        accesstoken
    });
}

export const getNewToken = async (refreshToken: string) => {
    return await axios.post(`${DOMAIN_PATH}${API_PATHS.AUTH.REFRESH}`, {
        refreshToken
    });
} 
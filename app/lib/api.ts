import axios, { AxiosInstance } from "axios";

export interface LoginResponse {
    token: string;
    // add other fields your API returns here
}

const api: AxiosInstance = axios.create({
    baseURL: "https://mahmoudmohammed.site/api",
    withCredentials: true,  // <-- here
    headers: { "Content-Type": "application/json" }
});

// persist token in both axios default header and localStorage
export function setAuthToken(token: string | null): void {
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("token", token);
    } else {
        delete api.defaults.headers.common["Authorization"];
        localStorage.removeItem("token");
    }
}

// on page load, rehydrate axios header from localStorage
if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
}

export default api;

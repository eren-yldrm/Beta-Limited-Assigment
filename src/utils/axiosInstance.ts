import axios from "axios";
import { BASE } from "../service/urls";

export const axiosInstance = axios.create({
    baseURL: BASE,
});
export default async function handleSession() {
    const { data } = await axios.get(`${BASE}/createsession`);
    axiosInstance.interceptors.request.use((config) => {
        config.headers["Session-ID"] = data;
        return config;
    });
}

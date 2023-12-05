import axios from "axios";

const axiosInstance = axios.create({
    baseURL :" https://etechpolltesting.onrender.com/"
})

export default axiosInstance
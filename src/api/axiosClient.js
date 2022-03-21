import axios from 'axios';
import queryString from 'query-string';

import apiConfig from './apiConfig';

const axiosClient = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        'Content-Type': 'application/json'
    },
    // Serializer params
    paramsSerializer: params => queryString.stringify({ ...params, api_key: apiConfig.apiKey })
});

// Add a request interceptor: Thêm một trình chặn yêu cầu
axiosClient.interceptors.request.use(async (config) => config);

// Add a response interceptor: Thêm một bộ đánh chặn phản hồi
axiosClient.interceptors.response.use(async (response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    throw error;
});

export default axiosClient;

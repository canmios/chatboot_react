import axios from 'axios';

const API_URL = 'http://localhost:8080/api/properties';

export const saveProperty = (property) => {
    return axios.post(API_URL, property);
};

export const chatWithBot = (message) => {
    return axios.post('http://localhost:8080/api/chat', { message });
};

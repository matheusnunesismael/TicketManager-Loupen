import axios from 'axios';

const api = axios.create({
    baseURL: 'https://loupendemo.freshdesk.com/api/v2'
});

export default api;
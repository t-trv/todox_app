// file này sẽ làm baseurl api, các file khác cần gọi thư viện axios và truyền url vào -> api.method(/tasks)

import axios from 'axios';

const BASE_URL = import.meta.env.MODE === 'development' ? 'http://localhost:5001/api' : '/api';

const api = axios.create({
    baseURL: BASE_URL,
});

export default api;

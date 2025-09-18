// file này sẽ làm baseurl api, các file khác cần gọi thư viện axios và truyền url vào -> api.method(/tasks)

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5001/api',
});

export default api;

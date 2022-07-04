import axios from 'axios';

const api = axios.create({
  baseURL: String(process.env.REACT_APP_API_URL),
});

export default api;

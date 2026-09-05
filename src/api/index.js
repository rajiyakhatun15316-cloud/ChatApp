import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'));
const TOKEN = user ? user.accessToken : '';

let baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const API = axios.create({
  baseURL: baseUrl,
});

API.interceptors.request.use((req) => {
  const userStr = localStorage.getItem('user');
  if (userStr && userStr !== "null") {
    const user = JSON.parse(userStr);
    if (user && user.accessToken) {
      req.headers.Authorization = `Bearer ${user.accessToken}`;
    }
  }
  return req;
});

export default API;

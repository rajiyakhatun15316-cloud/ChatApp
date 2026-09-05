import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'));
const TOKEN = user ? user.accessToken : '';

const API = axios.create({
  baseURL:'http://localhost:8000',
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

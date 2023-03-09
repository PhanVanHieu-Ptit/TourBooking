import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers.Authorization = `${localStorage.getItem('Authorization')}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

export default instance;

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});
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

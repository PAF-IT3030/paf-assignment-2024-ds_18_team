import axios from "axios";

const instance = axios.create({
  baseURL: `http://localhost:8080`,
  // other custom settings
});

/*
instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('jwtToken');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
  
);
*/
export default instance;

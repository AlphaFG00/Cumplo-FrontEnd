import axios from 'axios';

const instance = axios.create({
  baseURL: (process.env.NODE_ENV === 'production') ? 'https://cumplo-app-backend.herokuapp.com/' : 'http://0.0.0.0:8001/',
});

export default instance;
